<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Removes orphaned post meta.
 */
class OrphanedMeta extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        global $wpdb;

        $wpdb->query("
            DELETE pm FROM $wpdb->postmeta pm
            LEFT JOIN $wpdb->posts p ON pm.post_id = p.ID
            WHERE p.ID IS NULL
        ");
    }
}