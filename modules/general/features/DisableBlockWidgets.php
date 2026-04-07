<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableBlockWidgets
 *
 * Disables block-based widgets (introduced in newer WordPress versions).
 * Useful for sites that want to use classic widgets and prevent block widgets scripts/styles from loading.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableBlockWidgets {

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
    public function __construct($key, $value) {
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * Run the feature
     *
     * Disables block-based widgets if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('use_widgets_block_editor', '__return_false');
        }
    }
}