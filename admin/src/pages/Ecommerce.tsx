import React from 'react';
import { Card, CardHead, Row, Toggle, Badge, TagInput } from '../components/Primitives';
import type { SpeedPressOptions } from '../types';

export function PageEcommerce({
  opts,
  set,
}: {
  opts: SpeedPressOptions;
  set: (k: keyof SpeedPressOptions, v: any) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] animate-[fadeUp_0.3s_ease]">
      <Card>
        <CardHead title="WooCommerce Cache Exclusions" desc="Never cache these critical eCommerce pages" icon="shop" color="var(--green)" />
        <Row label="Exclude Cart Page" hint="Prevents cart content from being cached incorrectly">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">Recommended</Badge>
            <Toggle checked={opts.excl_cart} onChange={(v) => set('excl_cart', v)} />
          </div>
        </Row>
        <Row label="Exclude Checkout Page" hint="Always serve fresh checkout pages">
          <div className="flex items-center gap-[6px]">
            <Badge color="green">Recommended</Badge>
            <Toggle checked={opts.excl_checkout} onChange={(v) => set('excl_checkout', v)} />
          </div>
        </Row>
        <Row label="Exclude My Account" hint="User-specific account pages must not be cached" last>
          <div className="flex items-center gap-[6px]">
            <Badge color="green">Recommended</Badge>
            <Toggle checked={opts.excl_myaccount} onChange={(v) => set('excl_myaccount', v)} />
          </div>
        </Row>
      </Card>
      <Card>
        <CardHead title="WooCommerce Fragment Caching" desc="Optimize WooCommerce AJAX cart fragments" icon="zap" color="var(--green)" />
        <Row label="Optimize WC Fragments" hint="Reduce unnecessary cart fragment requests that slow every page load">
          <div className="flex items-center gap-[6px]">
            <Badge color="orange">Big impact</Badge>
            <Toggle checked={opts.woo_fragments} onChange={(v) => set('woo_fragments', v)} />
          </div>
        </Row>
        <Row label="Disable on Non-Shop Pages" hint="Completely disable cart fragments on pages that don't need them" last>
          <Toggle checked={opts.woo_disable_cart_fragments} onChange={(v) => set('woo_disable_cart_fragments', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead title="Category-Specific Optimization" desc="Load scripts only where they are needed" icon="list" color="var(--blue)" />
        <Row label="Scripts per Category" hint="Only load category-specific scripts (e.g. Size Charts) on relevant products" last>
          <Toggle checked={opts.woo_scripts_per_category} onChange={(v) => set('woo_scripts_per_category', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead title="WooCommerce Bloat Removal" desc="Disable non-essential WooCommerce features" icon="script" color="var(--red)" />
        <Row label="Disable WC Widgets" hint="Remove default WooCommerce widgets from the sidebar">
          <Toggle checked={opts.disable_woo_widgets} onChange={(v) => set('disable_woo_widgets', v)} />
        </Row>
        <Row label="Disable Status Meta Box" hint="Remove the WooCommerce status box from the WP Dashboard">
          <Toggle checked={opts.disable_woo_status_meta} onChange={(v) => set('disable_woo_status_meta', v)} />
        </Row>
        <Row label="Disable WC Reviews" hint="Globally disable WooCommerce product reviews" last>
          <Toggle checked={opts.disable_woo_reviews} onChange={(v) => set('disable_woo_reviews', v)} />
        </Row>
      </Card>
      <Card>
        <CardHead title="Cookie-Based Cache Rules" icon="shield" color="var(--amber)" />
        <Row label="Cookie Exclusions" hint="Skip cache when these cookies are present (auto-detects WooCommerce cookies)" last>
          <div className="w-[360px]">
            <TagInput
              values={opts.cache_exclude_cookies}
              onChange={(v) => set('cache_exclude_cookies', v)}
              placeholder="Cookie name…"
            />
          </div>
        </Row>
      </Card>
    </div>
  );
}
