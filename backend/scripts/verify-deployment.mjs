import { pathToFileURL } from 'node:url';

const DEFAULT_TIMEOUT_MS = 10_000;
const MIN_TIMEOUT_MS = 1_000;
const MAX_TIMEOUT_MS = 60_000;

export function readDeploymentConfig(environment = process.env) {
  return {
    apiBaseUrl: readHttpsUrl(
      'QUEUEWISE_API_URL',
      environment.QUEUEWISE_API_URL,
    ),
    socketBaseUrl: readHttpsUrl(
      'QUEUEWISE_SOCKET_URL',
      environment.QUEUEWISE_SOCKET_URL,
    ),
    timeoutMs: readTimeout(environment.DEPLOYMENT_VERIFY_TIMEOUT_MS),
  };
}

export async function verifyDeployment(
  { apiBaseUrl, socketBaseUrl, timeoutMs = DEFAULT_TIMEOUT_MS },
  { fetchImpl = globalThis.fetch, log = console.log } = {},
) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('This command requires a runtime with fetch support.');
  }

  const livenessUrl = joinUrl(apiBaseUrl, 'health');
  const readinessUrl = joinUrl(apiBaseUrl, 'health/ready');
  const socketHandshakeUrl = buildSocketHandshakeUrl(socketBaseUrl);

  const liveness = await requestJson(
    fetchImpl,
    livenessUrl,
    'Liveness check',
    timeoutMs,
  );
  if (liveness?.status !== 'ok') {
    throw new Error('Liveness check returned an unexpected response.');
  }
  log(`PASS liveness: ${livenessUrl}`);

  const readiness = await requestJson(
    fetchImpl,
    readinessUrl,
    'Readiness check',
    timeoutMs,
  );
  if (readiness?.status !== 'ready' || readiness?.database !== 'connected') {
    throw new Error('Readiness check did not confirm the database connection.');
  }
  log(`PASS readiness: ${readinessUrl}`);

  const handshake = await requestText(
    fetchImpl,
    socketHandshakeUrl,
    'Socket.IO handshake',
    timeoutMs,
  );
  validateSocketHandshake(handshake);
  log(`PASS Socket.IO handshake: ${socketHandshakeUrl}`);

  return { livenessUrl, readinessUrl, socketHandshakeUrl };
}

function readHttpsUrl(name, rawValue) {
  const value = rawValue?.trim();
  if (!value) {
    throw new Error(`${name} is required.`);
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid URL.`);
  }

  if (url.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS.`);
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      `${name} must not include credentials, query parameters, or a fragment.`,
    );
  }

  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url.toString().replace(/\/$/, '');
}

function readTimeout(rawValue) {
  if (rawValue === undefined || rawValue.trim() === '') {
    return DEFAULT_TIMEOUT_MS;
  }

  const timeoutMs = Number(rawValue);
  if (
    !Number.isInteger(timeoutMs) ||
    timeoutMs < MIN_TIMEOUT_MS ||
    timeoutMs > MAX_TIMEOUT_MS
  ) {
    throw new Error(
      `DEPLOYMENT_VERIFY_TIMEOUT_MS must be an integer between ${MIN_TIMEOUT_MS} and ${MAX_TIMEOUT_MS}.`,
    );
  }
  return timeoutMs;
}

function joinUrl(baseUrl, path) {
  return `${baseUrl.replace(/\/$/, '')}/${path}`;
}

function buildSocketHandshakeUrl(socketBaseUrl) {
  const url = new URL('/socket.io/', `${socketBaseUrl}/`);
  url.searchParams.set('EIO', '4');
  url.searchParams.set('transport', 'polling');
  return url.toString();
}

async function requestJson(fetchImpl, url, label, timeoutMs) {
  const response = await request(fetchImpl, url, label, timeoutMs);
  try {
    return await response.json();
  } catch {
    throw new Error(`${label} did not return valid JSON.`);
  }
}

async function requestText(fetchImpl, url, label, timeoutMs) {
  const response = await request(fetchImpl, url, label, timeoutMs);
  return response.text();
}

async function request(fetchImpl, url, label, timeoutMs) {
  let response;
  try {
    response = await fetchImpl(url, {
      headers: { accept: 'application/json, text/plain;q=0.9' },
      redirect: 'error',
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${label} could not reach ${url}: ${message}`);
  }

  if (!response.ok) {
    throw new Error(`${label} failed with HTTP ${response.status} at ${url}.`);
  }
  return response;
}

function validateSocketHandshake(payload) {
  if (!payload.startsWith('0')) {
    throw new Error(
      'Socket.IO endpoint did not return an Engine.IO open packet.',
    );
  }

  let packet;
  try {
    packet = JSON.parse(payload.slice(1));
  } catch {
    throw new Error(
      'Socket.IO endpoint returned a malformed Engine.IO packet.',
    );
  }

  if (
    packet === null ||
    typeof packet !== 'object' ||
    typeof packet.sid !== 'string' ||
    packet.sid.length === 0 ||
    typeof packet.pingInterval !== 'number' ||
    typeof packet.pingTimeout !== 'number'
  ) {
    throw new Error(
      'Socket.IO endpoint returned an incomplete Engine.IO packet.',
    );
  }
}

async function main() {
  try {
    const config = readDeploymentConfig();
    await verifyDeployment(config);
    console.log('Production deployment verification passed.');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Production deployment verification failed: ${message}`);
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
