<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class AsyncCSS
 *
 * Loads non-critical CSS files asynchronously to improve page rendering speed.
 * Provides exclusion support for specific CSS handles.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class AsyncCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress to modify <link> tags for async CSS loading.
     *
     * @return void
     */
    public function run(): void {
        // Check if this feature is enabled
        if (!$this->value['enabled']) return;

        add_filter('style_loader_tag', function($tag, $handle) {
            // Skip excluded CSS handles
            if (in_array($handle, $this->value['exclude'] ?? [])) {
                return $tag;
            }

            // Modify link tag to load asynchronously
            $tag = str_replace(
                "rel='stylesheet'", 
                "rel='stylesheet' media='print' onload=\"this.media='all'\"", 
                $tag
            );

            return $tag;
        }, 10, 2);
    }
}