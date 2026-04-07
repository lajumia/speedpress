<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableSVGFilters
 *
 * Disables SVG filters in WordPress to improve front-end performance.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableSVGFilters extends BaseFeature
{

    /**
     * Run the feature
     *
     * Disables SVG filters if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('wp_render_svg_use_filters', '__return_false');
        }
    }
}