<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class RemoveUnusedCSS
 *
 * Removes CSS rules that are not used on the current page to reduce
 * CSS file size and improve page performance.
 * Can be configured per page type or globally.
 * Supports exclusions so critical selectors or handles are preserved.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class RemoveUnusedCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress `wp_enqueue_scripts` to identify and remove
     * unused CSS. Actual removal logic should integrate with a CSS
     * analyzer or custom algorithm. Excluded handles or selectors
     * are never removed.
     *
     * Expected $value structure:
     * [
     *     'enabled' => true|false,
     *     'exclusions' => ['.my-class', 'style-handle']
     * ]
     *
     * @return void
     */
    public function run(): void {
        if (empty($this->value['enabled'])) {
            return;
        }

        $exclusions = $this->value['exclusions'] ?? [];

        add_action('wp_enqueue_scripts', function() use ($exclusions) {
            // Get all enqueued styles
            global $wp_styles;

            if (empty($wp_styles->queue)) return;

            foreach ($wp_styles->queue as $handle) {
                // Skip excluded handles
                if (in_array($handle, $exclusions, true)) {
                    continue;
                }

                // TODO: Analyze CSS content for this handle and remove unused rules
                // Example placeholder: integrate with a CSS optimizer library
                $src = $wp_styles->registered[$handle]->src ?? '';
                if ($src) {
                    // Here you could generate a "used CSS" file per handle
                    // while preserving exclusions
                }
            }
        });
    }
}