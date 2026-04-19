<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class WebPConversion
 *
 * Converts JPEG/PNG images to WebP format for better compression and performance.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class WebPConversion extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into image upload and serves WebP images if supported.
     *
     * @return void
     */
    public function run(): void {
        if (!$this->value) return;

        // TODO: Implement WebP conversion on upload
    }
}