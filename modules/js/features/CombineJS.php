<?php

namespace SpeedPress\Modules\JS\Features;

use SpeedPress\Modules\JS\Features\BaseFeature;

/**
 * Class CombineJS
 *
 * Combines multiple JavaScript files into one to reduce HTTP requests.
 *
 * @package SpeedPress\Modules\JS\Features
 * @since 1.0.0
 */
class CombineJS extends BaseFeature {

    public function run(): void {
        if (!$this->value['enabled']) return;

        add_action('wp_enqueue_scripts', function () {
            // TODO: Merge JS files excluding $this->value['exclude']
        });
    }
}