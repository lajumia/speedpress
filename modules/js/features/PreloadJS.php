<?php

namespace SpeedPress\Modules\JS\Features;

use SpeedPress\Modules\JS\Features\BaseFeature;

/**
 * Class PreloadJS
 *
 * Adds `<link rel='preload'>` for specified scripts to improve LCP.
 *
 * @package SpeedPress\Modules\JS\Features
 * @since 1.0.0
 */
class PreloadJS extends BaseFeature {

    public function run(): void {
        if (empty($this->value)) return;

        add_action('wp_head', function () {
            foreach ($this->value as $handle) {
                $src = wp_scripts()->registered[$handle]->src ?? '';
                if ($src) {
                    echo "<link rel='preload' as='script' href='$src'>\n";
                }
            }
        });
    }
}