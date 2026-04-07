<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableGutenberg
 *
 * Disables the Gutenberg block editor for posts and post types.
 * Useful for sites that prefer the classic editor or want to prevent block editor scripts from loading.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableGutenberg extends BaseFeature
{

    /**
     * Run the feature
     *
     * Adds filters to disable Gutenberg editor if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('use_block_editor_for_post', '__return_false', 10);
            add_filter('use_block_editor_for_post_type', '__return_false', 10);
        }
    }
}