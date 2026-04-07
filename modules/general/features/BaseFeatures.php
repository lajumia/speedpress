<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Abstract class for all GeneralModule features
 */
abstract class BaseFeature {

    protected $key;
    protected $value;

    public function __construct($key, $value) {
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * Each feature must implement its own run() method
     */
    abstract public function run();
}