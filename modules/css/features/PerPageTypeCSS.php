<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class PerPageTypeCSS
 *
 * Generates separate used CSS for different page types such as Posts,
 * Pages, and Archives to reduce unnecessary CSS loading.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class PerPageTypeCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress to detect the page type and enqueue only
     * the CSS needed for that specific page type.
     *
     * @return void
     */
    public function run(): void {
        if (!$this->value['enabled']) return;

        add_action('wp_enqueue_scripts', function() {
            if (is_single()) {
                // TODO: Enqueue CSS specific to single posts
            } elseif (is_page()) {
                // TODO: Enqueue CSS specific to pages
            } elseif (is_archive()) {
                // TODO: Enqueue CSS specific to archive pages
            }
        });
    }
}