export async function updateSettings(settings: any) {

  const response = await fetch(`${speedpress.restUrl}speedpress/v1/settings`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': speedpress.nonce,
    },

    body: JSON.stringify(settings),
  });

  const data = await response.json();

  console.log('STATUS:', response.status);
  console.log('RESPONSE:', data);

  return data;
}
