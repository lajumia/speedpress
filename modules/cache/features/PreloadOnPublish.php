<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class PreloadOnPublish
 *
 * Regenerate cache immediately when a post or page is saved/updated.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class PreloadOnPublish extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action(['save_post', 'publish_post'], function($post_id) {
            // Regenerate cache for this post/page
        });
    }
}