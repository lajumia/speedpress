<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class PostRevisions
 *
 * Cleans up old post revisions and limits how many to keep.
 */
class PostRevisions extends BaseFeature {

    public function run(): void {
        if (empty($this->value['enabled'])) return;

        global $wpdb;

        $keep = intval($this->value['keep'] ?? 3);

        $wpdb->query("
            DELETE FROM $wpdb->posts
            WHERE post_type = 'revision'
            AND ID NOT IN (
                SELECT * FROM (
                    SELECT ID FROM $wpdb->posts
                    WHERE post_type = 'revision'
                    ORDER BY post_modified DESC
                    LIMIT $keep
                ) temp
            )
        ");
    }
}