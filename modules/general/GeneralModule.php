<?php

namespace SpeedPress\Modules\General;

/**
 * Class GeneralModule
 *
 * Handles execution of all "General" optimization features
 * based on plugin settings stored in WordPress options.
 *
 * Each feature is mapped to a dedicated Feature class and
 * executed only if enabled in settings.
 *
 * @package SpeedPress\Modules\General
 */
class GeneralModule {

    /**
     * General module settings from WordPress options.
     *
     * This array comes from:
     * get_option('speedpress_settings')['general']
     *
     * Example structure:
     * [
     *   'disable_emojis' => true,
     *   'disable_dashicons' => false,
     *   'heartbeat_dashboard_interval' => 15
     * ]
     *
     * @var array<string, mixed>
     */
    protected $settings;

    /**
     * Map of settings keys to feature classes.
     *
     * Each key represents a setting inside the "general" group,
     * and each value is the Feature class responsible for it.
     *
     * @var array<string, string>
     */
    protected $features = [
        'disable_emojis'            => Features\DisableEmojis::class,
        'disable_embeds'            => Features\DisableEmbeds::class,
        'disable_jquery_migrate'    => Features\DisableJQueryMigrate::class,
        'disable_dashicons'         => Features\DisableDashicons::class,
        'disable_rss_feeds'         => Features\DisableRSSFeeds::class,
        'remove_rss_links'          => Features\RemoveRSSLinks::class,
        'disable_password_strength' => Features\DisablePasswordStrength::class,
        'remove_query_strings'      => Features\RemoveQueryStrings::class,
        'disable_block_library_css' => Features\DisableBlockLibraryCSS::class,
        'disable_global_styles'     => Features\DisableGlobalStyles::class,
        'disable_gutenberg_editor'  => Features\DisableGutenbergEditor::class,
        'disable_block_widgets'     => Features\DisableBlockWidgets::class,
        'disable_svg_filters'       => Features\DisableSVGFilters::class,
        'heartbeat_dashboard_interval' => Features\HeartbeatInDashboard::class,
        'heartbeat_editor_interval' => Features\HeartbeatInEditor::class,
        'heartbeat_frontend_interval' => Features\HeartbeatInFrontend::class,
    ];

    /**
     * Constructor
     *
     * @param array<string, mixed> $settings
     *        General settings from:
     *        get_option('speedpress_settings')['general']
     */
    public function __construct(array $settings) {
        $this->settings = $settings;
    }

    /**
     * Run all enabled features based on settings.
     *
     * Each feature is executed only if:
     * - The setting key exists
     * - The value is truthy (or valid numeric interval)
     *
     * @return void
     */
    public function run() {
        foreach ($this->features as $key => $featureClass) {

            if (isset($this->settings[$key]) && $this->settings[$key]) {
                
                try {
                    $feature = new $featureClass($key, $this->settings[$key]);

                    $feature->run();

                } catch (\Throwable $e) {
                    error_log('ERROR: ' . $e->getMessage());
                    error_log($e->getTraceAsString());
                }
            }
        }
    }
}