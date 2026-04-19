<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class BrowserCaching
 *
 * Adds Expires/Cache-Control headers for static assets.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class BrowserCaching extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action('send_headers', function() {
            header("Cache-Control: max-age=31536000, public");
        });
    }
}