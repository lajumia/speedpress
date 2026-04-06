import type { SpeedPressOptions } from './types';

export const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'chart', section: null, keywords: 'home, overview, stats, performance' },
  { id: 'license', label: 'License', icon: 'key', section: null, keywords: 'key, activation, pro, serial' },
  { sep: true, label: 'PERFORMANCE' },
  { id: 'scripts', label: 'General', icon: 'script', section: 'perf', keywords: 'wordpress, bloat, heartbeat, emojis, embeds, jquery' },
  { id: 'caching', label: 'Caching', icon: 'cache', section: 'perf', keywords: 'page, object, redis, memcached, expiry, purge, warmup' },
  { id: 'files', label: 'File Optimization', icon: 'code', section: 'perf', keywords: 'minify, combine, css, js, critical, async, defer, delay' },
  { id: 'assetmgr', label: 'Asset Manager', icon: 'list', section: 'perf', keywords: 'scripts, styles, handles, dependencies, unload' },
  { id: 'media', label: 'Media', icon: 'media', section: 'perf', keywords: 'images, webp, avif, compress, resize, lazy, youtube, video' },
  { id: 'vitals', label: 'Core Web Vitals', icon: 'vitals', section: 'perf', keywords: 'lcp, cls, inp, ttfb, fcp, metrics, report' },
  { id: 'fonts', label: 'Font Optimization', icon: 'font', section: 'perf', keywords: 'google, local, preload, swap, display, gravatar' },
  { id: 'lazyload', label: 'Lazy Loading', icon: 'mouse', section: 'perf', keywords: 'images, iframes, videos, threshold, native' },
  { id: 'preload', label: 'Preload & Hints', icon: 'preload', section: 'perf', keywords: 'prefetch, preconnect, dns, hints, speculation, instant' },
  { sep: true, label: 'MANAGEMENT' },
  { id: 'database', label: 'Database', icon: 'db', section: 'mgmt', keywords: 'revisions, drafts, transients, tables, indexing, cleanup' },
  { id: 'cdn', label: 'CDN', icon: 'cdn', section: 'mgmt', keywords: 'cloudflare, url, zone, static, purge' },
  { id: 'analytics', label: 'Local Analytics', icon: 'analytics', section: 'mgmt', keywords: 'google, facebook, gtm, delay, anonymize' },
  { id: 'ecommerce', label: 'eCommerce', icon: 'shop', section: 'mgmt', keywords: 'woocommerce, cart, checkout, fragments, reviews' },
  { sep: true, label: 'ADVANCED' },
  { id: 'monitor', label: 'Monitoring', icon: 'activity', section: 'adv', keywords: 'uptime, logs, errors, health' },
  { id: 'developer', label: 'Developer', icon: 'dev', section: 'adv', keywords: 'debug, logs, console, expert' },
  { id: 'security', label: 'Security', icon: 'shield', section: 'adv', keywords: 'xmlrpc, version, rsd, rest, login, slug' },
  { id: 'tools', label: 'Tools', icon: 'settings', section: 'adv', keywords: 'nginx, varnish, rollback, snapshots, export, import' },
  { sep: true, label: 'SUPPORT' },
  { id: 'help', label: 'Help & Docs', icon: 'help', section: 'support', keywords: 'documentation, support, ticket, guide' },
];

export const DEFAULT_OPTIONS: SpeedPressOptions = {
  // Caching
  cache_enabled: true,
  cache_mobile: false,
  cache_loggedin: false,
  cache_browser: true,
  cache_expiry: 86400,
  cache_auto_purge: true,
  cache_schedule: false,
  cache_schedule_freq: 'daily',
  cache_warmup: true,
  cache_preload: true,
  cache_sitemap: '',
  cache_preload_on_publish: true,
  cache_smart_invalidation: true,
  cache_redis: false,
  cache_redis_host: '127.0.0.1',
  cache_redis_port: 6379,
  cache_memcached: false,
  cache_edge: false,
  cache_exclude_urls: ['/cart', '/checkout', '/my-account', '/wp-admin'],
  cache_exclude_cookies: ['woocommerce_cart_hash', 'woocommerce_items_in_cart'],
  cache_exclude_ua: [],
  gzip_compression: true,
  brotli_compression: true,

  // Files
  min_html: true,
  min_css: true,
  min_js: true,
  min_inline: true,
  combine_css: false,
  combine_js: false,
  remove_unused_css: false,
  critical_css: false,
  critical_css_custom: '',
  async_css: false,
  defer_js: true,
  delay_js: false,
  inline_critical: false,
  remove_render_blocking: false,
  min_css_exclude: [],
  min_js_exclude: [],
  combine_css_exclude: [],
  combine_js_exclude: [],
  delay_js_exclude: [],
  defer_js_exclude: [],
  async_css_exclude: [],
  delay_js_timeout: 10,
  js_try_catch: false,

  // Media
  lazy_images: true,
  lazy_images_exclude: [],
  lazy_iframes: true,
  lazy_iframes_exclude: [],
  lazy_videos: false,
  lazy_load_css_bg: false,
  lazy_load_css_bg_exclude: [],
  yt_preview: true,
  webp: false,
  avif: false,
  img_compress: false,
  img_resize: false,
  strip_meta: false,
  preload_hero: false,
  img_decoding_async: true,
  img_lqip: false,

  // Vitals
  lcp_opt: true,
  inp_opt: false,
  cls_fix: true,
  font_preload: true,
  font_display: 'swap',
  remove_unused_fonts: false,
  preconnect_domains: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  dns_prefetch: ['//fonts.googleapis.com', '//fonts.gstatic.com'],
  preload_assets: [],
  fetch_priority: true,

  // Preload
  prefetch_links: [],
  preload_fonts: [],
  preload_css: [],
  preload_js: [],
  preload_hero_img: '',
  instant_page: true,
  speculation_rules: false,
  speculation_rules_mode: 'prerender',
  early_hints: false,

  // Database
  db_revisions: true,
  db_revisions_max: 3,
  db_autodrafts: true,
  db_trash: true,
  db_spam: true,
  db_transients: true,
  db_opt_tables: true,
  db_indexing: true,
  db_schedule: true,
  db_schedule_freq: 'weekly',
  db_orphaned_meta: true,

  // CDN
  cdn_enabled: false,
  cdn_url: '',
  cdn_multiple: false,
  cdn_urls: [],
  cdn_cf_enabled: false,
  cdn_cf_zone: '',
  cdn_cf_key: '',
  cdn_images_only: false,
  cdn_static_only: false,
  cdn_auto_purge: true,
  cdn_exts: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'css', 'js', 'woff', 'woff2'],

  // eCommerce
  excl_cart: true,
  excl_checkout: true,
  excl_myaccount: true,
  woo_fragments: true,
  disable_woo_widgets: false,
  disable_woo_status_meta: true,
  disable_woo_reviews: false,
  cookie_rules: [],

  // Scripts
  disable_emojis: true,
  disable_embeds: true,
  disable_heartbeat: false,
  heartbeat_freq: 60,
  remove_query_strings: true,
  script_manager: false,
  disable_jquery_migrate: true,
  disable_dashicons: true,
  disable_rss: false,
  disable_rss_links: false,
  disable_self_pingbacks: true,
  disable_password_strength: false,
  disable_comment_cookies: true,
  disable_gravatars: false,
  disable_global_styles: false,
  disable_block_library: false,
  disable_svg_filters: true,
  disable_gutenberg: false,
  disable_block_widgets: true,
  partytown: false,
  partytown_scripts: [],

  // Fonts
  fonts_local: true,
  fonts_display_swap: true,
  fonts_remove_google: false,
  fonts_preload_local: true,
  fonts_local_path: '/wp-content/uploads/speedpress-fonts/',

  // Analytics
  analytics_local: false,
  analytics_ga_id: '',
  analytics_fb_id: '',
  analytics_gtm_id: '',
  analytics_delay: true,
  analytics_anonymize: true,

  // Lazy Load
  lazy_load_threshold: 300,
  lazy_load_native: true,
  lazy_load_youtube: true,
  lazy_load_vimeo: true,
  lazy_load_gmaps: true,

  // Heartbeat
  heartbeat_dashboard: 'modify',
  heartbeat_editor: 60,
  heartbeat_frontend: 'disable',

  // Security
  safe_mode: false,
  conflict_detection: true,
  auto_rollback: true,
  disable_xmlrpc: true,
  hide_wp_version: true,
  remove_rsd: true,
  remove_wlwmanifest: true,
  remove_shortlink: true,
  remove_rest_api: false,
  login_url_slug: '',
  disable_login_language_switcher: true,
  disable_application_passwords: true,

  // License
  license_key: '',
  license_status: 'inactive',
  license_plan: '',

  // Asset Manager
  asset_rules: [
    { id: 1, type: 'js', handle: 'jquery', src: '/wp-includes/js/jquery/jquery.min.js', load: 'normal', location: 'head', minify: true, combine: true, defer: false, delay: false, excludePages: [] },
    { id: 2, type: 'js', handle: 'wp-embed', src: '/wp-includes/js/wp-embed.min.js', load: 'defer', location: 'footer', minify: true, combine: false, defer: true, delay: false, excludePages: [] },
    { id: 3, type: 'js', handle: 'wc-cart-fragments', src: '/woocommerce/assets/js/frontend/cart-fragments.min.js', load: 'delay', location: 'footer', minify: true, combine: false, defer: false, delay: true, excludePages: ['/checkout', '/cart'] },
    { id: 4, type: 'js', handle: 'contact-form-7', src: '/contact-form-7/includes/js/index.js', load: 'defer', location: 'footer', minify: true, combine: false, defer: true, delay: false, excludePages: [] },
    { id: 5, type: 'js', handle: 'google-analytics', src: 'https://www.googletagmanager.com/gtag/js', load: 'delay', location: 'head', minify: false, combine: false, defer: false, delay: true, excludePages: [] },
    { id: 6, type: 'css', handle: 'wp-block-library', src: '/wp-includes/css/dist/block-library/style.min.css', load: 'async', location: 'head', minify: true, combine: true, defer: false, delay: false, excludePages: [] },
    { id: 7, type: 'css', handle: 'dashicons', src: '/wp-includes/css/dashicons.min.css', load: 'normal', location: 'head', minify: true, combine: true, defer: false, delay: false, excludePages: ['/wp-admin'] },
    { id: 8, type: 'css', handle: 'woocommerce-layout', src: '/woocommerce/assets/css/woocommerce-layout.css', load: 'normal', location: 'head', minify: true, combine: true, defer: false, delay: false, excludePages: [] },
    { id: 9, type: 'css', handle: 'contact-form-7', src: '/contact-form-7/includes/css/styles.css', load: 'async', location: 'head', minify: true, combine: true, defer: false, delay: false, excludePages: [] },
    { id: 10, type: 'js', handle: 'slick-slider', src: '/themes/mystore/assets/js/slick.min.js', load: 'normal', location: 'footer', minify: true, combine: false, defer: false, delay: false, excludePages: [] },
  ],
  asset_regex_support: false,
  asset_global_rules: true,
  plugin_enabled: true,

  // CSS Advanced
  rucss_automatic: false,
  rucss_per_page_type: false,
  critical_css_per_page: false,

  // JS Advanced
  delay_js_on_interaction: true,
  script_manager_ui: true,

  // Media Advanced
  adaptive_images: false,
  svg_sanitization: true,
  video_facades_wistia: true,
  video_facades_dailymotion: true,
  lazy_load_css_bg_advanced: false,

  // Database Advanced
  db_autoload_analysis: true,
  db_table_map: true,

  // Vitals Advanced
  rum_enabled: false,
  psi_api_key: '',

  // Server
  nginx_config_gen: false,
  varnish_purge: false,

  // Fonts Advanced
  fonts_localize_gravatars: true,

  // eCommerce Advanced
  woo_disable_cart_fragments: true,
  woo_scripts_per_category: false,

  // UX
  setup_wizard_completed: false,
  rollback_snapshots: [],
};
