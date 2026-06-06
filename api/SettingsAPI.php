<?php

namespace SpeedPress\API;

class SettingsAPI {

    /**
     * Update plugin settings via REST API
     *
     * @param \WP_REST_Request $request
     * @return array
     */
    public static function update_settings($request) {

        // Get new settings
        $new_settings = $request->get_param('settings');

        // Validate settings
        if (!is_array($new_settings)) {

            return [
                'success' => false,
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
            'success' => true,
            'message' => 'Settings updated successfully.',
            'data' => $updated_settings
        ];
    }

    public static function get_settings() {

        $settings = get_option('speedpress_settings', []);

        return [
            'success' => true,
            'data' => $settings,
        ];
    }
}