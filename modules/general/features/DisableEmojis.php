<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableEmojis
 *
 * Disables WordPress emoji support by removing the default emoji scripts and styles.
 * Useful for performance optimization since emoji scripts/styles add extra HTTP requests.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableEmojis extends BaseFeature
{

    /**
     * Run the feature
     *
     * If enabled, removes emoji detection scripts and styles from the front-end.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            remove_action('wp_head', 'print_emoji_detection_script', 7);
            remove_action('wp_print_styles', 'print_emoji_styles');
        }
    }
}