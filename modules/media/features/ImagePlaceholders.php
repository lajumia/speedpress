<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class ImagePlaceholders
 *
 * Generates low-quality image placeholders (LQIP) for lazy-loaded images.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class ImagePlaceholders extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Generate blurred placeholders for lazy-loading
    }
}