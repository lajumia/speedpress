<?php

namespace SpeedPress\Modules\JS\Features;

use SpeedPress\Modules\JS\Features\BaseFeature;

/**
 * Class MinifyJS
 *
 * Minifies JavaScript files to reduce file size and improve load time.
 *
 * @package SpeedPress\Modules\JS\Features
 * @since 1.0.0
 */
class MinifyJS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress `script_loader_tag` to minify JS unless excluded.
     *
     * @return void
     */
    public function run(): void {
        if (!$this->value['enabled']) return;

        add_filter('script_loader_tag', function ($tag, $handle) {
            if (in_array($handle, $this->value['exclude'] ?? [])) {
                return $tag;
            }

            // Example minification: remove extra spaces
            $tag = preg_replace('/\s+/', ' ', $tag);
            return $tag;
        }, 10, 2);
    }
}