# 🚀 SpeedPress – WordPress Performance Plugin

SpeedPress is a modern, modular, and developer-friendly WordPress performance plugin designed to optimize Core Web Vitals and overall site speed.

It provides powerful features like caching, CSS/JS optimization, image optimization, CDN integration, and system-level performance tweaks — all in a clean, extensible architecture.

---

## ✨ Features

### 🔧 General Optimizations

* Disable Emojis
* Disable Gutenberg Editor
* Disable XML-RPC
* Disable jQuery Migrate
* Disable Dashicons (frontend)
* Disable RSS Feeds
* Remove RSS Links
* Disable Password Strength Meter
* Remove Query Strings from assets
* Disable Block Library CSS
* Disable Global Styles
* Disable Block Widgets
* Disable SVG Filters
* Heartbeat API Control (Dashboard, Editor, Frontend)

---

### ⚡ Caching System

* Page Caching
* Cache Expiry Control
* Mobile Cache Support
* Logged-in User Cache Control
* Browser Caching Headers
* Smart Cache Invalidation
* Auto Cache Purge
* GZIP Compression
* Brotli Compression (optional)
* Cache Preloading

  * On Publish
  * Sitemap-based
  * Scheduled
* Object Cache Support

  * Redis
  * Memcached
* Edge Cache Support
* Advanced Cache Exclusions

  * URLs
  * Cookies
  * User Agents

---

### 🎨 CSS Optimization

* Minify CSS
* Combine CSS
* Async CSS Loading
* Remove Unused CSS (planned)
* CSS Preloading
* Exclusion Rules

---

### ⚙️ JavaScript Optimization

* Minify JS
* Combine JS
* Defer JavaScript
* Delay JavaScript Execution
* Script Manager (planned)
* JS Preloading
* Exclusion Rules

---

### 🌐 CDN Integration (Planned)

* CDN URL Rewriting
* Image-only CDN
* Static Asset CDN
* Auto Purge CDN
* Cloudflare Integration

---

## 🧱 Architecture

SpeedPress follows a **modular, scalable architecture** inspired by modern PHP design principles.

```
SpeedPress/
├── Core/
│   ├── Bootstrap.php
│   ├── Logger.php
│   └── SettingsAPI.php
│
├── Modules/
│   ├── General/
│   │   ├── GeneralModule.php
│   │   └── Features/
│   │       ├── BaseFeature.php
│   │       ├── DisableEmojis.php
│   │       ├── DisableDashicons.php
│   │       └── ...
│   │
│   ├── Cache/
│   ├── CSS/
│   └── JS/
│
├── Admin/
├── assets/
└── speedpress.php
```

---

## 🧩 Key Concepts

### 🔹 Bootstrap

Central entry point that:

* Defines constants
* Registers hooks
* Initializes admin panel
* Loads modules
* Registers REST API

---

### 🔹 Modules

Each feature group is separated into modules:

* General
* Cache
* CSS
* JS

Each module is independent and scalable.

---

### 🔹 Feature System

* Each feature is a class
* Uses a shared `BaseFeature` abstract class
* Only implements `run()` method

```php
class DisableEmojis extends BaseFeature {
    public function run() {
        if ($this->value) {
            remove_action('wp_head', 'print_emoji_detection_script');
        }
    }
}
```

---

### 🔹 Settings System

* Stored in: `wp_options → speedpress_settings`
* Structured as nested arrays (JSON-like)
* Default values set on plugin activation
* Safe merging using `wp_parse_args()`

---

### 🔹 REST API

Used for updating settings from admin UI.

**Endpoint:**

```
POST /wp-json/speedpress/v1/settings
```

**Example Request:**

```json
{
  "settings": {
    "general": {
      "disable_emojis": false
    }
  }
}
```

---

### 🔹 Logger

Simple debug logger:

```php
Logger::log('Message', 'context');
```

* Writes to: `/wp-content/cache/speedpress/logs/debug.log`
* Controlled by `SPEEDPRESS_DEBUG`

---

## ⚙️ Installation

1. Upload plugin to `/wp-content/plugins/`
2. Run:

   ```bash
   composer install
   ```
3. Activate plugin from WordPress admin

---

## 🛠 Development

### Requirements

* PHP 7.4+
* WordPress 6.0+

---

### Enable Debug Mode

```php
define('WP_DEBUG', true);
```

SpeedPress automatically enables logging via:

```php
define('SPEEDPRESS_DEBUG', true);
```

---

## 🔐 Security

* REST API protected with `current_user_can('manage_options')`
* Nonce validation required for admin requests
* Safe file handling using WordPress APIs

---

## 🚧 Roadmap

* Image Optimization Module
* Database Optimization
* CDN Integration
* Script Manager UI
* Lazy Loading System
* Core Web Vitals Dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📄 License

GPL-2.0-or-later
https://www.gnu.org/licenses/gpl-2.0.html

---

## 💡 Author

**SpeedPress Team**
https://wpspeedpress.com

---

## ⭐ Final Note

SpeedPress is built with a focus on:

* Clean architecture
* Performance-first design
* Developer extensibility

This is not just a plugin — it’s a **scalable performance framework for WordPress**.
