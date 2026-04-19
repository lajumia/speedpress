<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class GzipCompression
 *
 * Compress HTML, CSS, JS files using Gzip for faster delivery.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class GzipCompression extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (!ob_start("ob_gzhandler")) {
            ob_start();
        }
    }
}