<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class AVIFSupport
 *
 * Converts images to AVIF format for even smaller file sizes.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class AVIFSupport extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Implement AVIF conversion on upload
    }
}