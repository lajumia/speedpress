<?php

namespace SpeedPress\Modules\Images\Features;

/**
 * Class LazyLoadCSSBackgrounds
 *
 * Delays loading of background images defined in CSS.
 *
 * @package SpeedPress\Modules\Images\Features
 * @since 1.0.0
 */
class LazyLoadCSSBackgrounds extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_filter('wp_head', function() {
            echo "<style>
                [data-bg] { background-image: none !important; }
            </style>";
            echo "<script>
                document.addEventListener('DOMContentLoaded', function(){
                    document.querySelectorAll('[data-bg]').forEach(el => {
                        el.style.backgroundImage = 'url(' + el.getAttribute('data-bg') + ')';
                    });
                });
            </script>";
        });
    }
}