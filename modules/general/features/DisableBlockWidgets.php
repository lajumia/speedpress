<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableBlockWidgets
 *
 * Disables block-based widgets (introduced in newer WordPress versions).
 * Useful for sites that want to use classic widgets and prevent block widgets scripts/styles from loading.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableBlockWidgets extends BaseFeature
{

    /**
     * Run the feature
     *
     * Disables block-based widgets if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('use_widgets_block_editor', '__return_false');
        }
    }
}