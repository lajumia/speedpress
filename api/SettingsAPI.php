<?php

namespace SpeedPress\API;

class SettingsAPI {

    /**
     * Update plugin settings via REST API.
     *
     * Accepts a nested settings array and merges it with
     * existing SpeedPress settings stored in the WordPress options table.
     *
     * Example payload:
     * {
     *   "settings": {
     *      "general": {
     *          "disable_emojis": true
     *      }
     *   }
     * }
     *
     * @param \WP_REST_Request $request REST request object containing settings data.
     *
     * @return array|\WP_Error
     * Returns success status with updated settings data or error response.
     *
     * @since 1.0.0
     */
    public static function update_settings($request) {

        // Get new settings
        $new_settings = $request->get_param('settings');

        // Validate settings
        if (!is_array($new_settings)) {

            return [
                'status' => false,
                'message' => 'Invalid settings format.'
            ];
        }

        // Get existing settings
        $current_settings = get_option('speedpress_settings', []);

        // Properly merge settings
        $updated_settings = array_replace_recursive(
            $current_settings,
            $new_settings
        );

        // Save settings
        update_option('speedpress_settings', $updated_settings);

        return [
            'status' => true,
            'message' => 'Settings updated successfully.',
            'data' => $updated_settings
        ];
    }


    /**
     * Retrieve plugin settings via REST API.
     *
     * Returns the full SpeedPress settings array stored in the
     * WordPress options table.
     *
     * Example response:
     * {
     *   "success": true,
     *   "data": {
     *      "general": {...},
     *      "cache": {...}
     *   }
     * }
     *
     * @return array
     * Returns success response with all saved plugin settings.
     *
     * @since 1.0.0
     */
    public static function get_settings() {

        $settings = get_option('speedpress_settings', []);

        return [
            'status' => true,
            'data' => $settings
        ];
    }
}