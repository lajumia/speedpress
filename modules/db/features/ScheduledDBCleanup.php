<?php

namespace SpeedPress\Modules\Database\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ScheduledDBCleanup
 *
 * Runs database cleanup tasks on a schedule using WP-Cron.
 *
 * @package SpeedPress\Modules\Database\Features
 * @since 1.0.0
 */
class ScheduledDBCleanup extends BaseFeature {

    /**
     * Cron hook name
     */
    const CRON_HOOK = 'speedpress_db_cleanup_event';

    /**
     * Run feature
     */
    public function run(): void {
        if (empty($this->value['enabled'])) {
            $this->clear_schedule();
            return;
        }

        $this->schedule_event();

        add_action(self::CRON_HOOK, [$this, 'execute_cleanup']);
    }

    /**
     * Schedule cron event
     */
    protected function schedule_event(): void {
        $interval = $this->value['interval'] ?? 'daily';

        if (!wp_next_scheduled(self::CRON_HOOK)) {
            wp_schedule_event(time(), $interval, self::CRON_HOOK);
        }
    }

    /**
     * Clear cron if disabled
     */
    protected function clear_schedule(): void {
        $timestamp = wp_next_scheduled(self::CRON_HOOK);
        if ($timestamp) {
            wp_unschedule_event($timestamp, self::CRON_HOOK);
        }
    }

    /**
     * Execute DB cleanup
     */
    public function execute_cleanup(): void {

        // Load settings again (important for cron context)
        $settings = get_option('speedpress_settings', []);
        $db = $settings['database'] ?? [];

        // Run only enabled cleanup features
        $map = [
            'post_revisions'     => \SpeedPress\Modules\Database\Features\PostRevisions::class,
            'auto_drafts'        => \SpeedPress\Modules\Database\Features\AutoDrafts::class,
            'trashed_posts'      => \SpeedPress\Modules\Database\Features\TrashedPosts::class,
            'spam_comments'      => \SpeedPress\Modules\Database\Features\SpamComments::class,
            'expired_transients' => \SpeedPress\Modules\Database\Features\ExpiredTransients::class,
            'orphaned_meta'      => \SpeedPress\Modules\Database\Features\OrphanedMeta::class,
            'optimize_tables'    => \SpeedPress\Modules\Database\Features\OptimizeTables::class,
        ];

        foreach ($map as $key => $class) {
            if (!empty($db[$key]) && class_exists($class)) {
                $feature = new $class($key, $db[$key]);
                $feature->run();
            }
        }
    }
}