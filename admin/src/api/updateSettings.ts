/**
 * Update SpeedPress plugin settings via WordPress REST API.
 *
 * This function sends updated settings to the backend and stores them
 * in the WordPress options table using:
 * `update_option('speedpress_settings', ...)`
 *
 * Endpoint:
 * POST /wp-json/speedpress/v1/settings
 *
 * Headers:
 * - Content-Type: application/json
 * - X-WP-Nonce: WordPress REST authentication nonce
 *
 * Payload structure:
 * {
 *   general: {
 *     disable_emojis: true
 *   },
 *   cache: {
 *     page_cache: true
 *   }
 * }
 *
 * @param {any} settings - Full or partial SpeedPress settings object.
 *
 * @returns {Promise<any>} API response object containing:
 * - success: boolean
 * - message?: string
 * - data?: object (updated settings)
 *
 * @example
 * await updateSettings({
 *   general: {
 *     disable_emojis: true
 *   }
 * });
 *
 * @throws Will fail if network request fails or server returns 4xx/5xx
 */
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

  return data;
}