<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableDashicons
 *
 * Disables the Dashicons font on the front-end of WordPress.
 * Dashicons are normally loaded by WordPress for admin icons and some themes/plugins,
 * but removing them on the front-end can reduce CSS load and improve performance.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableDashicons extends BaseFeature 
{

    /**
     * Run the feature
     *
     * Deregisters Dashicons on the front-end if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value && !is_admin()) {
            wp_deregister_style('dashicons');
        }
    }
}