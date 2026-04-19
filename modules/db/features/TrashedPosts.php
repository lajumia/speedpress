<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Deletes trashed posts permanently.
 */
class TrashedPosts extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        global $wpdb;
        $wpdb->query("DELETE FROM $wpdb->posts WHERE post_status = 'trash'");
    }
}