<?php

namespace SpeedPress\Modules\Images\Features;

/**
 * Class LazyLoadIframes
 *
 * Delays loading iframes like maps or embeds.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class LazyLoadIframes extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_filter('iframe_embed_html', function($html) {
            return str_replace('<iframe', '<iframe loading="lazy"', $html);
        });
    }
}