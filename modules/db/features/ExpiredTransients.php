<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Deletes expired transients.
 */
class ExpiredTransients extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        global $wpdb;

        $wpdb->query("
            DELETE FROM $wpdb->options
            WHERE option_name LIKE '_transient_timeout_%'
            AND option_value < UNIX_TIMESTAMP()
        ");
    }
}