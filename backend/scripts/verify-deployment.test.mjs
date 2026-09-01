import assert from 'node:assert/strict';
import test from 'node:test';
import {
  readDeploymentConfig,
  verifyDeployment,
} from './verify-deployment.mjs';

test('reads and normalizes production deployment URLs', () => {
  assert.deepEqual(
    readDeploymentConfig({
      QUEUEWISE_API_URL: ' https://api.queuewise.example/api/ ',
      QUEUEWISE_SOCKET_URL: 'https://api.queuewise.example/',
      DEPLOYMENT_VERIFY_TIMEOUT_MS: '5000',
    }),
    {
      apiBaseUrl: 'https://api.queuewise.example/api',
      socketBaseUrl: 'https://api.queuewise.example',
      timeoutMs: 5000,
    },
  );
});

test('rejects missing, insecure, and credential-bearing URLs', () => {
  assert.throws(
    () => readDeploymentConfig({}),
    /QUEUEWISE_API_URL is required/,
  );
  assert.throws(
    () =>
      readDeploymentConfig({
        QUEUEWISE_API_URL: 'http://api.queuewise.example/api',
        QUEUEWISE_SOCKET_URL: 'https://api.queuewise.example',
      }),
    /QUEUEWISE_API_URL must use HTTPS/,
  );
  assert.throws(
    () =>
      readDeploymentConfig({
        QUEUEWISE_API_URL: 'https://user:pass@api.queuewise.example/api',
        QUEUEWISE_SOCKET_URL: 'https://api.queuewise.example',
      }),
    /must not include credentials/,
  );
});

test('verifies liveness, readiness, and the Socket.IO handshake', async () => {
  const requestedUrls = [];
  const fetchImpl = async (url) => {
    requestedUrls.push(url);
    if (url.endsWith('/health')) {
      return jsonResponse({ status: 'ok' });
    }
    if (url.endsWith('/health/ready')) {
      return jsonResponse({ status: 'ready', database: 'connected' });
    }
    return textResponse(
      '0{"sid":"socket-id","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000}',
    );
  };

  const result = await verifyDeployment(
    {
      apiBaseUrl: 'https://api.queuewise.example/api',
      socketBaseUrl: 'https://api.queuewise.example',
      timeoutMs: 5000,
    },
    { fetchImpl, log: () => {} },
  );

  assert.deepEqual(requestedUrls, [
    'https://api.queuewise.example/api/health',
    'https://api.queuewise.example/api/health/ready',
    'https://api.queuewise.example/socket.io/?EIO=4&transport=polling',
  ]);
  assert.equal(
    result.socketHandshakeUrl,
    'https://api.queuewise.example/socket.io/?EIO=4&transport=polling',
  );
});

test('fails when readiness does not confirm the database connection', async () => {
  const fetchImpl = async (url) => {
    if (url.endsWith('/health')) {
      return jsonResponse({ status: 'ok' });
    }
    return jsonResponse({ status: 'ready', database: 'disconnected' });
  };

  await assert.rejects(
    verifyDeployment(
      {
        apiBaseUrl: 'https://api.queuewise.example/api',
        socketBaseUrl: 'https://api.queuewise.example',
      },
      { fetchImpl, log: () => {} },
    ),
    /did not confirm the database connection/,
  );
});

test('fails when the Socket.IO endpoint is not an Engine.IO handshake', async () => {
  const fetchImpl = async (url) => {
    if (url.endsWith('/health')) {
      return jsonResponse({ status: 'ok' });
    }
    if (url.endsWith('/health/ready')) {
      return jsonResponse({ status: 'ready', database: 'connected' });
    }
    return textResponse('<html>proxy error</html>');
  };

  await assert.rejects(
    verifyDeployment(
      {
        apiBaseUrl: 'https://api.queuewise.example/api',
        socketBaseUrl: 'https://api.queuewise.example',
      },
      { fetchImpl, log: () => {} },
    ),
    /did not return an Engine.IO open packet/,
  );
});

test('fails when the Engine.IO open packet is incomplete', async () => {
  const fetchImpl = async (url) => {
    if (url.endsWith('/health')) {
      return jsonResponse({ status: 'ok' });
    }
    if (url.endsWith('/health/ready')) {
      return jsonResponse({ status: 'ready', database: 'connected' });
    }
    return textResponse('0null');
  };

  await assert.rejects(
    verifyDeployment(
      {
        apiBaseUrl: 'https://api.queuewise.example/api',
        socketBaseUrl: 'https://api.queuewise.example',
      },
      { fetchImpl, log: () => {} },
    ),
    /incomplete Engine.IO packet/,
  );
});

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function textResponse(value, status = 200) {
  return new Response(value, { status });
}
