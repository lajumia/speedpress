<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableJQueryMigrate
 *
 * Disables the jQuery Migrate script on the front-end of WordPress.
 * jQuery Migrate is used to maintain backward compatibility for older jQuery code,
 * but removing it can improve performance if your theme/plugins do not rely on it.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableJQueryMigrate {

    /**
     * The settings key for this feature.
     *
     * @var string
     */
    protected $key;

    /**
     * Whether this feature is enabled.
     *
     * @var bool
     */
    protected $value;

    /**
     * Constructor
     *
     * @param string $key   The feature key from plugin settings.
     * @param bool   $value Whether this feature is enabled.
     */
    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * Run the feature
     *
     * Removes the jQuery Migrate dependency from WordPress front-end jQuery if enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('wp_default_scripts', function($scripts) {
                // Only affect front-end, not admin
                if (!is_admin() && isset($scripts->registered['jquery'])) {
                    $scripts->registered['jquery']->deps = array_diff(
                        $scripts->registered['jquery']->deps,
                        ['jquery-migrate']
                    );
                }
            });
        }
    }
}