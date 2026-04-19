<?php

namespace SpeedPress\Modules\Database;

use SpeedPress\Modules\Database\Features\PostRevisions;
use SpeedPress\Modules\Database\Features\AutoDrafts;
use SpeedPress\Modules\Database\Features\TrashedPosts;
use SpeedPress\Modules\Database\Features\SpamComments;
use SpeedPress\Modules\Database\Features\ExpiredTransients;
use SpeedPress\Modules\Database\Features\OrphanedMeta;
use SpeedPress\Modules\Database\Features\OptimizeTables;
use SpeedPress\Modules\Database\Features\DatabaseIndexing;

/**
 * Class DatabaseModule
 *
 * Handles database cleanup and optimization.
 */
class DatabaseModule {

    protected array $settings;

    protected array $features = [
        'post_revisions'     => PostRevisions::class,
        'auto_drafts'        => AutoDrafts::class,
        'trashed_posts'      => TrashedPosts::class,
        'spam_comments'      => SpamComments::class,
        'expired_transients' => ExpiredTransients::class,
        'orphaned_meta'      => OrphanedMeta::class,
        'optimize_tables'    => OptimizeTables::class,
        'db_indexing'        => DatabaseIndexing::class,
    ];

    public function __construct(array $settings = []) {
        $this->settings = array_merge($this->defaults(), $settings);
    }

    protected function defaults(): array {
        return [
            'post_revisions' => ['enabled' => true, 'keep' => 3],
            'auto_drafts' => true,
            'trashed_posts' => true,
            'spam_comments' => true,
            'expired_transients' => true,
            'orphaned_meta' => true,
            'optimize_tables' => true,
            'db_indexing' => false,
        ];
    }

    public function run(): void {
        foreach ($this->features as $key => $class) {
            if (!class_exists($class)) continue;

            $value = $this->settings[$key] ?? false;

            if ($value) {
                $feature = new $class($key, $value);
                $feature->run();
            }
        }
    }
}