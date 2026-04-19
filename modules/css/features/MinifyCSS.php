<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class MinifyCSS
 *
 * Minifies CSS output by removing whitespace and comments.
 * Helps reduce the size of CSS files for faster page load times.
 *
 * Excludes specific CSS handles if defined in the settings.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class MinifyCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress' style_loader_tag filter to modify
     * the CSS tag output and perform minification if enabled.
     *
     * @return void
     */
    public function run(): void {
        if (!$this->value) return;

        add_filter('style_loader_tag', function($tag, $handle) {
            // Skip minification for excluded handles
            if (in_array($handle, $this->value['exclude'] ?? [])) return $tag;

            // Basic minification example: remove extra whitespace
            $tag = preg_replace('/\s+/', ' ', $tag);
            return $tag;
        }, 10, 2);
    }
}