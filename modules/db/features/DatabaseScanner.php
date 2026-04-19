<?php

namespace SpeedPress\Modules\Database;

class DatabaseScanner {

    /**
     * Run full scan
     */
    public function scan(): array {
        global $wpdb;

        return [
            'post_revisions'     => $this->count_post_revisions($wpdb),
            'auto_drafts'        => $this->count_auto_drafts($wpdb),
            'trashed_posts'      => $this->count_trashed_posts($wpdb),
            'spam_comments'      => $this->count_spam_comments($wpdb),
            'expired_transients' => $this->count_expired_transients($wpdb),
            'orphaned_meta'      => $this->count_orphaned_meta($wpdb),
        ];
    }

    private function count_post_revisions($wpdb): int {
        return (int) $wpdb->get_var("
            SELECT COUNT(*) FROM $wpdb->posts WHERE post_type = 'revision'
        ");
    }

    private function count_auto_drafts($wpdb): int {
        return (int) $wpdb->get_var("
            SELECT COUNT(*) FROM $wpdb->posts WHERE post_status = 'auto-draft'
        ");
    }

    private function count_trashed_posts($wpdb): int {
        return (int) $wpdb->get_var("
            SELECT COUNT(*) FROM $wpdb->posts WHERE post_status = 'trash'
        ");
    }

    private function count_spam_comments($wpdb): int {
        return (int) $wpdb->get_var("
            SELECT COUNT(*) FROM $wpdb->comments WHERE comment_approved = 'spam'
        ");
    }

    private function count_expired_transients($wpdb): int {
        return (int) $wpdb->get_var("
            SELECT COUNT(*) FROM $wpdb->options
            WHERE option_name LIKE '_transient_timeout_%'
            AND option_value < UNIX_TIMESTAMP()
        ");
    }

    private function count_orphaned_meta($wpdb): int {
        return (int) $wpdb->get_var("
            SELECT COUNT(*) FROM $wpdb->postmeta pm
            LEFT JOIN $wpdb->posts p ON pm.post_id = p.ID
            WHERE p.ID IS NULL
        ");
    }
}