<?php

namespace SpeedPress\Modules\Images\Features;

use SpeedPress\Modules\Images\Features\BaseFeature;

/**
 * Class AsyncImageDecoding
 *
 * Adds `decoding='async'` to all non-critical images to improve page load.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class AsyncImageDecoding extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_filter('wp_get_attachment_image_attributes', function($attr) {
            $attr['decoding'] = 'async';
            return $attr;
        });
    }
}