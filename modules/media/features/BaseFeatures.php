<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class BaseFeature
 *
 * Abstract base class for all CSS feature modules in SpeedPress.
 * Ensures a consistent interface for all features, requiring
 * implementation of the run() method.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
abstract class BaseFeature {

    /**
     * The settings key for this feature.
     *
     * @var string
     */
    protected string $key;

    /**
     * The value or settings associated with this feature.
     *
     * @var mixed
     */
    protected mixed $value;

    /**
     * Constructor
     *
     * @param string $key   The feature key from plugin settings.
     * @param mixed  $value The feature value or settings.
     */
    public function __construct(string $key, mixed $value) {
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * Run the feature
     *
     * All child classes must implement this method to execute
     * their functionality.
     *
     * @return void
     */
    abstract public function run(): void;
}