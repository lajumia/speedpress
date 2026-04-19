<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Adds missing indexes for performance improvement.
 */
class DatabaseIndexing extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        global $wpdb;

        // Example: Add index to postmeta
        $wpdb->query("
            ALTER TABLE $wpdb->postmeta
            ADD INDEX meta_key (meta_key(191))
        ");
    }
}