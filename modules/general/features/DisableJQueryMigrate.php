<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableJQueryMigrate
 *
 * Removes the jQuery Migrate dependency from frontend jQuery.
 * This reduces unnecessary JavaScript loading when themes
 * and plugins no longer require legacy jQuery compatibility.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableJQueryMigrate extends BaseFeature
{
    /**
     * Register hooks.
     *
     * @return void
     */
    public function run(): void
    {
        if (!$this->value) {
            return;
        }

        add_action('wp_default_scripts', [$this, 'remove_jquery_migrate']);
    }

    /**
     * Remove jQuery Migrate from frontend jQuery dependencies.
     *
     * @param \WP_Scripts $scripts WordPress scripts object.
     * @return void
     */
    public function remove_jquery_migrate($scripts): void
    {
        if (is_admin()) {
            return;
        }

        if (!isset($scripts->registered['jquery'])) {
            return;
        }

        $scripts->registered['jquery']->deps = array_diff(
            $scripts->registered['jquery']->deps,
            ['jquery-migrate']
        );
    }
}