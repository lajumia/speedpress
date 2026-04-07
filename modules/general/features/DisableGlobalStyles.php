<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableGlobalStyles
 *
 * Disables WordPress global styles enqueued by the theme or core.
 * Useful for optimizing frontend performance by preventing unnecessary CSS loading.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableGlobalStyles extends BaseFeature
{

    /**
     * Run the feature
     *
     * Removes the action that enqueues global styles if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
        }
    }
}