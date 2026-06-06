export async function getSettings() {

  const response = await fetch(
    `${speedpress.restUrl}speedpress/v1/settings`,
    {
      headers: {
        'X-WP-Nonce': speedpress.nonce,
      }
    }
  );

  return response.json();
}