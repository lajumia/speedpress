<?php

namespace SpeedPress\Core;

class SettingsAPI {

    /**
     * Update plugin settings via REST API
     *
     * @param \WP_REST_Request $request
     * @return array
     */
    public static function update_settings($request) {
        $new_settings = $request->get_param('settings');

        if (!is_array($new_settings)) {
            return [
                'success' => false,
                'message' => 'Invalid settings format.'
            ];
        }

        // Merge new settings with existing ones
        $current_settings = get_option('speedpress_settings', []);
        $updated_settings = array_merge_recursive($current_settings, $new_settings);

        // Save updated settings
        update_option('speedpress_settings', $updated_settings);

        return [
            'success' => true,
            'message' => 'Settings updated successfully.',
            'data' => $updated_settings
        ];
    }
}