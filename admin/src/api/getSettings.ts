/**
 * Fetch SpeedPress settings from WordPress REST API.
 *
 * This function calls the backend endpoint:
 * GET /wp-json/speedpress/v1/settings
 *
 * It requires a valid WordPress REST nonce for authentication.
 *
 * @returns {Promise<any>} Returns plugin settings object
 *
 * @example
 * const settings = await getSettings();
 * console.log(settings.data);
 */
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