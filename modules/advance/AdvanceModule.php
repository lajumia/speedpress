<?php

namespace SpeedPress\Modules\Advanced;

use SpeedPress\Modules\Advanced\Features\PartyTown;
use SpeedPress\Modules\Advanced\Features\MinifyHTML;

/**
 * Class AdvancedModule
 *
 * Handles advanced performance optimizations for SpeedPress.
 * Integrates features like PartyTown and HTML minification.
 *
 * @package SpeedPress\Modules\Advanced
 * @since 1.0.0
 */
class AdvancedModule {

    /**
     * Module settings
     *
     * @var array
     */
    protected array $settings;

    /**
     * Feature map
     *
     * Maps setting keys to their corresponding feature classes.
     *
     * @var array
     */
    protected array $features = [
        'partytown'    => PartyTown::class,
        'minify_html'  => MinifyHTML::class,
    ];

    /**
     * Constructor
     *
     * @param array $settings Module settings from options table
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
            'partytown'   => false,
            'minify_html' => false,
        ];

        return array_merge($defaults, $settings);
    }
}