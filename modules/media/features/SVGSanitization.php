<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class SVGSanitization
 *
 * Cleans SVG files from malicious code and minifies XML.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class SVGSanitization extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Sanitize SVG uploads and minify XML
    }
}