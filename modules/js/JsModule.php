<?php

namespace SpeedPress\Modules\JS;

use SpeedPress\Modules\JS\Features\MinifyJS;
use SpeedPress\Modules\JS\Features\CombineJS;
use SpeedPress\Modules\JS\Features\DeferJS;
use SpeedPress\Modules\JS\Features\DelayJS;
use SpeedPress\Modules\JS\Features\ScriptManager;
use SpeedPress\Modules\JS\Features\PreloadJS;

/**
 * Class JSModule
 *
 * Handles JavaScript optimization features for SpeedPress.
 *
 * Features include:
 * - Minification
 * - Combining
 * - Defer loading
 * - Delayed execution
 * - Script manager UI
 * - Preloading
 *
 * @package SpeedPress\Modules\JS
 * @since 1.0.0
 */
class JSModule {

    /**
     * Module settings
     *
     * @var array
     */
    protected array $settings;

    /**
     * Feature map
     *
     * @var array
     */
    protected array $features = [
        'minify'         => MinifyJS::class,
        'combine'        => CombineJS::class,
        'defer'          => DeferJS::class,
        'delay'          => DelayJS::class,
        'script_manager' => ScriptManager::class,
        'preload'        => PreloadJS::class,
    ];

    /**
     * Constructor
     *
     * @param array $settings JS module settings from options table
     */
    public function __construct(array $settings = []) {
        $this->settings = $this->set_defaults($settings);
    }

    /**
     * Run all enabled features
     *
     * @return void
     */
    public function run(): void {
        foreach ($this->features as $key => $featureClass) {
            if (!class_exists($featureClass)) continue;

            $value = $this->settings[$key] ?? false;

            if ($value) {
                $feature = new $featureClass($key, $value);
                $feature->run();
            }
        }
    }

    /**
     * Set default settings if missing
     *
     * @param array $settings
     * @return array
     */
    protected function set_defaults(array $settings): array {
        $defaults = [
            'minify'         => ['enabled' => true, 'exclude' => []],
            'combine'        => ['enabled' => false, 'exclude' => []],
            'defer'          => ['enabled' => true, 'exclude' => []],
            'delay'          => ['enabled' => false, 'timeout' => 10, 'exclude' => []],
            'script_manager' => false,
            'preload'        => [],
        ];

        return array_merge($defaults, $settings);
    }
}