<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class PreloadCSS
 *
 * Preloads specified CSS files to improve page load performance.
 * Converts them to standard stylesheets once loaded.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class PreloadCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress `wp_head` to output <link rel="preload"> tags
     * for the configured CSS handles.
     *
     * @return void
     */
    public function run(): void {
        // Exit if no CSS handles are provided
        if (empty($this->value)) return;

        add_action('wp_head', function() {
            foreach ($this->value as $handle) {
                $src = wp_styles()->registered[$handle]->src ?? '';
                if ($src) {
                    echo "<link rel='preload' as='style' href='$src' onload=\"this.onload=null;this.rel='stylesheet'\">\n";
                }
            }
        });
    }
}