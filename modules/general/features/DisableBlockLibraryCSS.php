<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableBlockLibraryCSS
 *
 * Disables Gutenberg block library CSS on frontend.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableBlockLibraryCSS extends BaseFeature
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

        add_action('wp_enqueue_scripts', [$this, 'remove_block_css'], 100);
    }

    /**
     * Remove Gutenberg block styles
     *
     * @return void
     */
    public function remove_block_css(): void
    {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('wc-block-style'); // WooCommerce blocks (optional)
    }
}