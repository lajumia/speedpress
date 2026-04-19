<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Deletes spam comments permanently.
 */
class SpamComments extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        global $wpdb;
        $wpdb->query("DELETE FROM $wpdb->comments WHERE comment_approved = 'spam'");
    }
}