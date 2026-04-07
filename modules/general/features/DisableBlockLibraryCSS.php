<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableBlockCSS
 *
 * Disables the default block library CSS for Gutenberg blocks.
 * Helps reduce unnecessary CSS loading and improve frontend performance.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableBlockCSS extends BaseFeature
{
    /**
     * Run the feature
     *
     * Adds a filter to disable the block library CSS if enabled.
     *
     * @return void
     */
    public function run()
    {
        if ($this->value) {
            add_filter('wp_enqueue_block_styles', '__return_false');
        }
    }
}