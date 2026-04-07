<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class RemoveQueryStrings
 *
 * Removes query strings from static resources (CSS/JS) URLs.
 * Helps improve caching and performance for speed optimization.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class RemoveQueryStrings extends BaseFeature
{

    /**
     * Run the feature
     *
     * Adds filters to remove query strings from script and style URLs if enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('script_loader_src', [$this, 'remove_version'], 15, 1);
            add_filter('style_loader_src', [$this, 'remove_version'], 15, 1);
        }
    }

    /**
     * Remove ?ver= query string from a URL
     *
     * @param string $src URL of the script or style.
     * @return string Modified URL without the version query string.
     */
    public function remove_version($src){
        if (strpos($src, '?ver=') !== false) {
            $src = remove_query_arg('ver', $src);
        }
        return $src;
    }
}