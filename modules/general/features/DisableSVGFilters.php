<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableSVGFilters
 *
 * Disables WordPress SVG filters (duotone + theme.json effects).
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableSVGFilters extends BaseFeature
{
    /**
     * Run feature
     *
     * @return void
     */
    public function run(): void
    {
        if (!$this->value) {
            return;
        }

        add_filter('wp_render_svg_filters', '__return_false');
    }
}