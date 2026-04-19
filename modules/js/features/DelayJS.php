<?php

namespace SpeedPress\Modules\JS\Features;

use SpeedPress\Modules\JS\Features\BaseFeature;

/**
 * Class DelayJS
 *
 * Delays JavaScript execution until user interaction or timeout.
 *
 * @package SpeedPress\Modules\JS\Features
 * @since 1.0.0
 */
class DelayJS extends BaseFeature {

    public function run(): void {
        if (!$this->value['enabled']) return;

        add_action('wp_footer', function () {
            $timeout = intval($this->value['timeout'] ?? 10);
            $exclude = $this->value['exclude'] ?? [];

            // TODO: Implement JS delay logic, skipping $exclude handles
            echo "<script>
                document.addEventListener('DOMContentLoaded', function() {
                    // Example: delay scripts until interaction
                    let delayedScripts = [];
                    // user interaction triggers
                    ['click','scroll','mousemove'].forEach(e => {
                        document.addEventListener(e, function loadScripts() {
                            delayedScripts.forEach(s => { s(); });
                            delayedScripts = [];
                        }, { once: true });
                    });
                    // timeout fallback
                    setTimeout(function() {
                        delayedScripts.forEach(s => { s(); });
                    }, $timeout*1000);
                });
            </script>";
        });
    }
}