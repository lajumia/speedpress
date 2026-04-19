<?php

namespace SpeedPress\Modules\Media;

use SpeedPress\Modules\Media\Features\WebPConversion;
use SpeedPress\Modules\Media\Features\AVIFSupport;
use SpeedPress\Modules\Media\Features\CompressMedia;
use SpeedPress\Modules\Media\Features\AutoResizeMedia;
use SpeedPress\Modules\Media\Features\AsyncImageDecoding;
use SpeedPress\Modules\Media\Features\ImagePlaceholders;
use SpeedPress\Modules\Media\Features\StripEXIF;
use SpeedPress\Modules\Media\Features\AdaptiveMedia;
use SpeedPress\Modules\Media\Features\SVGSanitization;

/**
 * Class ImageModule
 *
 * Integrates all image optimization features:
 * - WebP and AVIF conversion
 * - Compression and resizing
 * - Async decoding
 * - Low-quality image placeholders
 * - EXIF stripping
 * - Adaptive images
 * - SVG sanitization
 *
 * @package SpeedPress\Modules\Media
 * @since 1.0.0
 */
class ImageModule {

    /**
     * Module settings
     *
     * @var array
     */
    protected array $settings;

    /**
     * List of all features and their classes
     *
     * @var array
     */
    protected array $features = [
        'webp_conversion'      => WebPConversion::class,
        'avif_support'         => AVIFSupport::class,
        'compress_images'      => CompressImages::class,
        'auto_resize_images'   => AutoResizeImages::class,
        'async_image_decoding' => AsyncImageDecoding::class,
        'image_placeholders'   => ImagePlaceholders::class,
        'strip_exif'           => StripEXIF::class,
        'adaptive_images'      => AdaptiveImages::class,
        'svg_sanitization'     => SVGSanitization::class,
        // Lazy load features
        'lazy_load_images'     => LazyLoadImages::class,
        'lazy_load_iframes'    => LazyLoadIframes::class,
        'lazy_load_backgrounds'=> LazyLoadCSSBackgrounds::class,
        'video_facades'        => VideoFacades::class,
    ];

    /**
     * Constructor
     *
     * @param array $settings Module settings from options
     */
    public function __construct(array $settings = []) {
        // Merge provided settings with default values
        $this->settings = array_merge($this->default_settings(), $settings);
    }

    /**
     * Default settings
     *
     * @return array
     */
    protected function default_settings(): array {
        return [
            'webp_conversion'      => true,
            'avif_support'         => false,
            'compress_images'      => true,
            'auto_resize_images'   => true,
            'async_image_decoding' => true,
            'image_placeholders'   => false,
            'strip_exif'           => true,
            'adaptive_images'      => true,
            'svg_sanitization'     => true,
            'lazy_load_images'      => ['enabled' => true, 'exclude' => ['.no-lazy', 'logo.png']],
            'lazy_load_iframes'     => true,
            'lazy_load_backgrounds' => true,
            'video_facades'         => true,
        ];
    }

    /**
     * Run all enabled features
     */
    public function run(): void {
        foreach ($this->features as $key => $class) {
            if (isset($this->settings[$key]) && $this->settings[$key]) {
                $feature = new $class($key, $this->settings[$key]);
                $feature->run();
            }
        }
    }
}