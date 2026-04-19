<?php

namespace SpeedPress\Modules\Images\Features;

/**
 * Class LazyLoadImages
 *
 * Delays loading images until they enter the viewport.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class LazyLoadImages extends BaseFeature {

    public function run(): void {
        if (!$this->value['enabled']) return;

        add_filter('wp_get_attachment_image_attributes', function($attr, $attachment) {
            // Skip excluded images
            $exclude = $this->value['exclude'] ?? [];
            if (isset($attr['class']) && preg_grep('/' . implode('|', $exclude) . '/', explode(' ', $attr['class']))) {
                return $attr;
            }

            $attr['loading'] = 'lazy';
            return $attr;
        }, 10, 2);
    }
}