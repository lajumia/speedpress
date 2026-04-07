<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableBlockCSS
 *
 * Disables the default block library CSS for Gutenberg blocks.
 * Helps reduce unnecessary CSS loading and improve frontend performance.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableBlockCSS {

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
     * Adds a filter to disable the block library CSS if enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            add_filter('wp_enqueue_block_styles', '__return_false');
        }
    }
}