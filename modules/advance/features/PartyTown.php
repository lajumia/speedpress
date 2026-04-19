<?php

namespace SpeedPress\Modules\Advanced\Features;

/**
 * Class PartyTown
 *
 * Offloads third-party scripts to a web worker using PartyTown
 * to reduce main thread blocking and improve performance.
 *
 * Expected $value:
 *  - true|false to enable or disable
 *
 * @package SpeedPress\Modules\Advanced\Features
 * @since 1.0.0
 */
class PartyTown extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action('wp_enqueue_scripts', function() {
            // Example: enqueue PartyTown script loader
            wp_enqueue_script(
                'partytown',
                plugin_dir_url(__FILE__) . 'assets/partytown.js',
                [],
                SPEEDPRESS_VERSION,
                true
            );

            // Add additional configuration if needed
        });
    }
}