<?php

namespace SpeedPress\Modules\Images\Features;

/**
 * Class VideoFacades
 *
 * Replaces heavy video players with static preview images until played.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class VideoFacades extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_filter('the_content', function($content) {
            return preg_replace_callback('/<iframe.*?src="(.*?)".*?>.*?<\/iframe>/', function($matches){
                $src = $matches[1];
                $poster = 'path/to/default/poster.jpg'; // Optionally generate dynamically
                return "<div class='video-facade' data-src='$src'><img src='$poster' /></div>";
            }, $content);
        });
    }
}