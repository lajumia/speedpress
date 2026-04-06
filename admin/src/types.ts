export interface AssetRule {
  id: number;
  type: 'js' | 'css';
  handle: string;
  src: string;
  load: 'normal' | 'defer' | 'async' | 'delay' | 'disable';
  location: 'head' | 'footer';
  minify: boolean;
  combine: boolean;
  defer: boolean;
  delay: boolean;
  excludePages: string[];
}

export interface SpeedPressOptions {
  // Caching
  cache_enabled: boolean;
  cache_mobile: boolean;
  cache_loggedin: boolean;
  cache_browser: boolean;
  cache_expiry: number;
  cache_auto_purge: boolean;
  cache_schedule: boolean;
  cache_schedule_freq: string;
  cache_warmup: boolean;
  cache_preload: boolean;
  cache_sitemap: string;
  cache_preload_on_publish: boolean;
  cache_smart_invalidation: boolean;
  cache_redis: boolean;
  cache_redis_host: string;
  cache_redis_port: number;
  cache_memcached: boolean;
  cache_edge: boolean;
  cache_exclude_urls: string[];
  cache_exclude_cookies: string[];
  cache_exclude_ua: string[];
  gzip_compression: boolean;
  brotli_compression: boolean;

  // Files
  min_html: boolean;
  min_css: boolean;
  min_js: boolean;
  min_inline?: boolean;
  combine_css: boolean;
  combine_js: boolean;
  remove_unused_css: boolean;
  critical_css: boolean;
  critical_css_custom: string;
  async_css: boolean;
  defer_js: boolean;
  delay_js: boolean;
  inline_critical: boolean;
  remove_render_blocking: boolean;
  min_css_exclude: string[];
  min_js_exclude: string[];
  combine_css_exclude: string[];
  combine_js_exclude: string[];
  delay_js_exclude: string[];
  defer_js_exclude: string[];
  async_css_exclude: string[];
  delay_js_timeout: number;
  js_try_catch: boolean;

  // Media
  lazy_images: boolean;
  lazy_images_exclude: string[];
  lazy_iframes: boolean;
  lazy_iframes_exclude: string[];
  lazy_videos: boolean;
  lazy_load_css_bg: boolean;
  lazy_load_css_bg_exclude: string[];
  yt_preview: boolean;
  webp: boolean;
  avif: boolean;
  img_compress: boolean;
  img_resize: boolean;
  strip_meta: boolean;
  preload_hero: boolean;
  img_decoding_async: boolean;
  img_lqip: boolean;

  // Vitals
  lcp_opt: boolean;
  inp_opt: boolean;
  cls_fix: boolean;
  font_preload: boolean;
  font_display: string;
  remove_unused_fonts: boolean;
  preconnect_domains: string[];
  dns_prefetch: string[];
  preload_assets: string[];
  fetch_priority: boolean;

  // Preload
  prefetch_links: string[];
  preload_fonts: string[];
  preload_css: string[];
  preload_js: string[];
  preload_hero_img: string;
  instant_page: boolean;
  speculation_rules: boolean;
  speculation_rules_mode: 'prerender' | 'prefetch';
  early_hints: boolean;

  // Database
  db_revisions: boolean;
  db_revisions_max: number;
  db_autodrafts: boolean;
  db_trash: boolean;
  db_spam: boolean;
  db_transients: boolean;
  db_opt_tables: boolean;
  db_indexing: boolean;
  db_schedule: boolean;
  db_schedule_freq: string;
  db_orphaned_meta?: boolean;
  db_orphaned_meta_count?: number;

  // CDN
  cdn_enabled: boolean;
  cdn_url: string;
  cdn_multiple: boolean;
  cdn_urls: string[];
  cdn_cf_enabled: boolean;
  cdn_cf_zone: string;
  cdn_cf_key: string;
  cdn_images_only: boolean;
  cdn_static_only: boolean;
  cdn_auto_purge: boolean;
  cdn_exts: string[];

  // eCommerce
  excl_cart: boolean;
  excl_checkout: boolean;
  excl_myaccount: boolean;
  woo_fragments: boolean;
  disable_woo_widgets: boolean;
  disable_woo_status_meta: boolean;
  disable_woo_reviews: boolean;
  cookie_rules: string[];

  // Scripts
  disable_emojis: boolean;
  disable_embeds: boolean;
  disable_heartbeat: boolean;
  heartbeat_freq: number;
  remove_query_strings: boolean;
  script_manager: boolean;
  disable_jquery_migrate: boolean;
  disable_dashicons: boolean;
  disable_rss: boolean;
  disable_rss_links: boolean;
  disable_self_pingbacks: boolean;
  disable_password_strength: boolean;
  disable_comment_cookies: boolean;
  disable_gravatars: boolean;
  disable_global_styles: boolean;
  disable_block_library: boolean;
  disable_svg_filters: boolean;
  disable_gutenberg: boolean;
  disable_block_widgets: boolean;
  partytown: boolean;
  partytown_scripts: string[];
  js_to_footer?: boolean;
  css_exclude_handles?: string[];
  js_exclude_handles?: string[];

  // Fonts
  fonts_local: boolean;
  fonts_display_swap: boolean;
  fonts_remove_google: boolean;
  fonts_preload_local: boolean;
  fonts_local_path: string;

  // Analytics
  analytics_local: boolean;
  analytics_ga_id: string;
  analytics_fb_id: string;
  analytics_gtm_id: string;
  analytics_delay: boolean;
  analytics_anonymize: boolean;

  // Lazy Load
  lazy_load_threshold: number;
  lazy_load_native: boolean;
  lazy_load_youtube: boolean;
  lazy_load_vimeo: boolean;
  lazy_load_gmaps: boolean;

  // Heartbeat
  heartbeat_dashboard: 'default' | 'disable' | 'modify';
  heartbeat_editor: number;
  heartbeat_frontend: 'default' | 'disable' | 'modify';

  // Security
  safe_mode: boolean;
  conflict_detection: boolean;
  auto_rollback: boolean;
  disable_xmlrpc: boolean;
  hide_wp_version: boolean;
  remove_rsd: boolean;
  remove_wlwmanifest: boolean;
  remove_shortlink: boolean;
  remove_rest_api: boolean;
  login_url_slug: string;
  disable_login_language_switcher: boolean;
  disable_application_passwords: boolean;

  // License
  license_key: string;
  license_status: 'active' | 'inactive';
  license_plan: string;

  // Asset Manager
  asset_rules: AssetRule[];
  asset_regex_support: boolean;
  asset_global_rules: boolean;
  plugin_enabled?: boolean;

  // CSS Advanced
  rucss_automatic: boolean;
  rucss_per_page_type: boolean;
  critical_css_per_page: boolean;

  // JS Advanced
  delay_js_on_interaction: boolean;
  script_manager_ui: boolean;

  // Media Advanced
  adaptive_images: boolean;
  svg_sanitization: boolean;
  video_facades_wistia: boolean;
  video_facades_dailymotion: boolean;
  lazy_load_css_bg_advanced: boolean;

  // Database Advanced
  db_autoload_analysis: boolean;
  db_table_map: boolean;

  // Vitals Advanced
  rum_enabled: boolean;
  psi_api_key: string;

  // Server
  nginx_config_gen: boolean;
  varnish_purge: boolean;

  // Fonts Advanced
  fonts_localize_gravatars: boolean;

  // eCommerce Advanced
  woo_disable_cart_fragments: boolean;
  woo_scripts_per_category: boolean;

  // UX
  setup_wizard_completed: boolean;
  rollback_snapshots: any[];
}

export interface ToastItem {
  id: number;
  title: string;
  msg?: string;
  type: 'success' | 'error' | 'warn' | 'info';
}

export interface DbLogItem {
  date: string;
  items: Record<string, number>;
  total: number;
}
