<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableGlobalStyles
 *
 * Disables WordPress global styles (theme.json CSS + SVG filters).
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableGlobalStyles extends BaseFeature
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

        add_action('wp_enqueue_scripts', [$this, 'remove_global_styles'], 100);
    }

    /**
     * Remove global styles + SVG filters
     *
     * @return void
     */
    public function remove_global_styles(): void
    {
        // Remove theme.json generated global styles
        wp_dequeue_style('global-styles');
        wp_dequeue_style('classic-theme-styles');

        // Remove inline global styles
        remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
        remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

        // Disable block supports global styles output
        add_filter('should_load_separate_core_block_assets', '__return_true');
    }
}