<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class CriticalCSS
 *
 * Handles Critical CSS optimization:
 * - Inlines above-the-fold styles for faster first paint.
 * - Defers non-critical CSS/JS to remove render-blocking.
 * - Supports custom critical CSS injection.
 *
 * Expected $value structure:
 * [
 *     'inline_enabled' => true|false,
 *     'custom_css' => 'string of CSS',
 *     'defer_resources' => true|false
 * ]
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class CriticalCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * @return void
     */
    public function run(): void {
        if (empty($this->value['inline_enabled'])) {
            return;
        }

        // Inject custom critical CSS before all stylesheets
        if (!empty($this->value['custom_css'])) {
            add_action('wp_head', function() {
                echo "<style id='speedpress-critical-css'>\n" . $this->value['custom_css'] . "\n</style>\n";
            }, 0); // priority 0 to load before other styles
        }

        // Inline detected critical CSS (placeholder for integration with extraction tool)
        add_action('wp_head', function() {
            // TODO: integrate with a Critical CSS generator
            // Example: echo "<style>...</style>";
        }, 1);

        // Remove render-blocking CSS/JS
        if (!empty($this->value['defer_resources'])) {
            add_filter('style_loader_tag', function($tag, $handle) {
                // Exclude critical CSS handle if needed
                if (strpos($tag, 'id="speedpress-critical-css"') !== false) return $tag;

                // Add media=print trick to load asynchronously
                $tag = str_replace("rel='stylesheet'", "rel='stylesheet' media='print' onload=\"this.media='all'\"", $tag);
                return $tag;
            }, 10, 2);

            add_filter('script_loader_tag', function($tag, $handle) {
                // Defer all scripts (except critical ones if needed)
                if (strpos($tag, 'defer') === false) {
                    $tag = str_replace('<script ', '<script defer ', $tag);
                }
                return $tag;
            }, 10, 2);
        }
    }
}