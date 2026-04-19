<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class CompressImages
 *
 * Compress uploaded images losslessly to reduce file size.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class CompressImages extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Hook into upload process and compress images
    }
}