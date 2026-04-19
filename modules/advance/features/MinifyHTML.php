<?php

namespace SpeedPress\Modules\Advanced\Features;

/**
 * Class MinifyHTML
 *
 * Minifies HTML output by removing whitespace, comments, and newlines.
 * Helps reduce page size and improve load times.
 *
 * Expected $value:
 *  - true|false to enable or disable
 *
 * @package SpeedPress\Modules\Advanced\Features
 * @since 1.0.0
 */
class MinifyHTML extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action('template_redirect', function() {
            ob_start(function($html) {
                // Remove HTML comments except conditional comments
                $html = preg_replace('/<!--(?!\[if).*?-->/', '', $html);
                // Remove extra whitespace between tags
                $html = preg_replace('/>\s+</', '><', $html);
                // Remove line breaks
                $html = str_replace(["\n", "\r", "\t"], '', $html);
                return $html;
            });
        });
    }
}