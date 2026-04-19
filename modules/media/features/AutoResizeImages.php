<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class AutoResizeImages
 *
 * Automatically resize oversized images on upload.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class AutoResizeImages extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Hook into upload process and resize large images
    }
}