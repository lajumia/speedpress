<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class BrotliCompression
 *
 * Compress files with Brotli for next-gen optimization.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class BrotliCompression extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (function_exists('ob_brotli_handler')) {
            ob_start('ob_brotli_handler');
        }
    }
}