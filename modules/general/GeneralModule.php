<?php

namespace SpeedPress\Modules\General;

class GeneralModule {

    protected $settings;

    /**
     * Map of settings keys to feature classes
     */
    protected $features = [
        'disable_emojis'               => Features\DisableEmojis::class,
        'disable_imojis'               => Features\DisableEmojis::class, // reuse if same
        'disable_gutenberg'            => Features\DisableGutenberg::class,
        'disable_xmlrpc'               => Features\DisableXMLRPC::class,
        'disable_jquery_migrate'       => Features\DisableJQueryMigrate::class,
        'disable_dashicons'            => Features\DisableDashicons::class,
        'disable_rss_feeds'            => Features\DisableRSS::class,
        'remove_rss_links'             => Features\RemoveRSSLinks::class,
        'disable_password_strength_meter' => Features\DisablePasswordStrength::class,
        'remove_query_strings'         => Features\RemoveQueryStrings::class,
        'disable_block_library_css'    => Features\DisableBlockCSS::class,
        'disable_global_styles'        => Features\DisableGlobalStyles::class,
        'disable_gutenberg_editor'     => Features\DisableGutenbergEditor::class,
        'disable_block_widgets'        => Features\DisableBlockWidgets::class,
        'disable_svg_filters'          => Features\DisableSVGFilters::class,
        'heartbeat_dashboard_interval' => Features\HeartbeatControl::class,
        'heartbeat_editor_interval'    => Features\HeartbeatControl::class,
        'heartbeat_frontend_interval'  => Features\HeartbeatControl::class,
    ];

    public function __construct(array $settings) {
        $this->settings = $settings;
    }

    public function run() {
        foreach ($this->features as $key => $featureClass) {

            // If the setting exists and is enabled / numeric
            if (isset($this->settings[$key]) && $this->settings[$key]) {
                $feature = new $featureClass($key, $this->settings[$key]);
                $feature->run();
            }
        }
    }
}