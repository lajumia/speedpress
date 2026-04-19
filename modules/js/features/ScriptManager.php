<?php

namespace SpeedPress\Modules\JS\Features;

use SpeedPress\Modules\JS\Features\BaseFeature;

/**
 * Class ScriptManager
 *
 * Provides a visual interface for per-page JS management.
 *
 * @package SpeedPress\Modules\JS\Features
 * @since 1.0.0
 */
class ScriptManager extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // TODO: Add admin page interface to enable/disable scripts per page
    }
}