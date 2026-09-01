export const legalPageScript = String.raw`(() => {
  const form = document.querySelector('[data-account-deletion-form]');
  if (!(form instanceof HTMLFormElement)) return;

  const button = form.querySelector('button[type="submit"]');
  const label = button?.querySelector('[data-button-label]');
  const status = form.querySelector('[data-form-status]');
  const result = document.querySelector('[data-deletion-result]');
  const resultHeading = result?.querySelector('h2');
  const fields = Array.from(form.querySelectorAll('input'));

  const setLoading = (loading) => {
    form.setAttribute('aria-busy', String(loading));
    if (button instanceof HTMLButtonElement) {
      button.disabled = loading;
      button.setAttribute('aria-disabled', String(loading));
      button.dataset.state = loading ? 'loading' : 'default';
    }
    if (label) label.textContent = loading ? 'Deleting account…' : 'Delete account';
  };

  const showError = (message) => {
    if (status) {
      status.textContent = message;
      status.dataset.tone = 'error';
    }
    fields.forEach((field) => field.setAttribute('aria-invalid', 'true'));
    const password = form.elements.namedItem('password');
    if (password instanceof HTMLInputElement) {
      password.value = '';
      password.focus();
    }
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      field.removeAttribute('aria-invalid');
      if (status) {
        status.textContent = '';
        delete status.dataset.tone;
      }
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    setLoading(true);
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!response.ok) {
        const message = response.status === 401
          ? 'We could not verify that email and password. Check both values and try again.'
          : 'The account could not be deleted. Check every field and try again.';
        showError(message);
        return;
      }

      form.reset();
      form.hidden = true;
      if (result) result.hidden = false;
      if (resultHeading instanceof HTMLElement) resultHeading.focus();
      window.history.replaceState({}, '', '/delete-account?deleted=1');
    } catch {
      showError('QueueWise could not reach the deletion service. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  });
})();`;
