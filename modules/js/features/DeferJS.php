<?php

namespace SpeedPress\Modules\JS\Features;

use SpeedPress\Modules\JS\Features\BaseFeature;

/**
 * Class DeferJS
 *
 * Adds `defer` attribute to JavaScript to load after page parsing.
 *
 * @package SpeedPress\Modules\JS\Features
 * @since 1.0.0
 */
class DeferJS extends BaseFeature {

    public function run(): void {
        if (!$this->value['enabled']) return;

        add_filter('script_loader_tag', function ($tag, $handle) {
            if (in_array($handle, $this->value['exclude'] ?? [])) {
                return $tag;
            }

            if (strpos($tag, ' src=') !== false) {
                $tag = str_replace(' src=', ' defer src=', $tag);
            }
            return $tag;
        }, 10, 2);
    }
}