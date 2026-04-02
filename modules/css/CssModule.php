<?php

namespace SpeedPress\Modules\CSS;

use SpeedPress\Modules\CSS\Features\Minify;
use SpeedPress\Modules\CSS\Features\Combine;
use SpeedPress\Modules\CSS\Features\Async;
use SpeedPress\Modules\CSS\Features\RemoveUnused;
use SpeedPress\Modules\CSS\Features\Preload;

class CSSModule {

    protected $settings;

    /**
     * Map settings keys to feature classes
     */
    protected $features = [
        'minify_css'        => Minify::class,
        'combine_css'       => Combine::class,
        'async_css'         => Async::class,
        'remove_unused_css' => RemoveUnused::class,
        'preload_css'       => Preload::class,
    ];

    public function __construct(array $settings) {
        $this->settings = $settings;
    }

    public function run() {
        foreach ($this->features as $key => $featureClass) {
            if (!empty($this->settings[$key])) {
                // Instantiate and run the feature
                $feature = new $featureClass($this->settings);
                $feature->run();
            }
        }
    }
}