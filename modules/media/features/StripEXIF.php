<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class StripEXIF
 *
 * Removes EXIF metadata such as GPS and camera information from images.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class StripEXIF extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Hook into upload process and strip EXIF metadata
    }
}