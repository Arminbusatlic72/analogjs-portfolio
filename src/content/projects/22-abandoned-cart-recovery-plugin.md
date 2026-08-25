---
title: "Abandoned Cart Capture & Recovery Plugin"
timePeriod: "Ongoing"
technology: "WordPress, WooCommerce, PHP, JavaScript, and MailerLite API"
featuredImage: "/projects/abandoned-cart-recovery.png"
projectImage: "/projects/abandoned-cart-recovery.png"
projectImageSec: "/projects/abandoned-cart-recovery/cart-records-redacted.png"
slug: "abandoned-cart-recovery-plugin"
order: 24
link: "https://mojprvizalogaj.rs/"
githublink: "https://github.com/Arminbusatlic72/abandoned-cart-capture"
description: "A production-ready WooCommerce plugin that captures consent-based abandoned carts, synchronizes recovery data with MailerLite, restores carts through secure links, generates personalized coupons, and reports recovered revenue."
tools: "WordPress, WooCommerce, PHP, JavaScript, MailerLite API, WordPress Cron, REST API, GDPR, CSV Reporting"
company: "Finesa d.o.o."
previousProject: moj-prvi-zalogaj
nextProject: portikla-bogo-plugin
---

# Challenge

The business needed a reusable abandoned-cart system that could capture useful recovery data across classic WooCommerce checkout, Checkout Blocks, and FunnelKit without ignoring guest customers or consent requirements.

The workflow also had to connect carts to MailerLite automations, restore the original cart securely, create controlled incentives, and measure actual recovered revenue after discounts and refunds.

## Role and responsibilities

I developed the custom WooCommerce plugin and its MailerLite integration. My responsibilities included:

- Capturing customer details, consent source, products, variations, quantities, prices, and totals for registered and guest checkouts.
- Supporting classic checkout, WooCommerce Checkout Blocks, FunnelKit, explicit GDPR consent, and configurable automatic capture.
- Synchronizing subscribers and structured cart fields with a dedicated MailerLite group.
- Building secure restoration links and customer-specific WooCommerce coupons.
- Tracking recovery through links, coupons, or both and reporting orders, net quantities, revenue, discounts, and refunds.
- Building administration, retry, CSV export, retention, personal-data export, and erasure workflows.
- Protecting requests with rate limits, payload limits, sanitization, signed cookies, secure tokens, and administrator nonces.

## Technical decisions

### Asynchronous MailerLite synchronization

MailerLite requests run through WordPress Cron instead of blocking checkout activity. Failed requests use exponential backoff, while administrators can inspect status and errors or trigger a manual retry.

### Secure, attributable cart restoration

Tokenized recovery URLs restore the recorded products, variations, and quantities. Signed attribution persists whether recovery happens through the link, the generated coupon, or both.

### Customer-specific WooCommerce coupons

Recovery coupons can use percentage or fixed discounts and are restricted by customer email, usage count, expiry, and optionally the products from the abandoned cart.

### Privacy and retention as product behavior

Configurable cleanup removes expired cart data and associated coupons. The plugin also integrates with WordPress personal-data export and erasure tools instead of treating privacy as a manual administration task.

## Result or measurable impact

A reusable production recovery workflow now connects captured WooCommerce carts to MailerLite personalization, secure restoration, customer-specific incentives, and net-revenue reporting. Administrators can inspect synchronization health, retry failures, export data, and manage retention from WordPress.

No verified recovery-rate or revenue-lift metric was supplied, so none is claimed here.

## Screenshots

The screenshots show recovery reporting, MailerLite synchronization settings, privacy retention controls, and the abandoned-cart administration table. Live order, customer, address, coupon, revenue, date, and integration identifiers have been redacted for privacy.

## Links

- [View a live implementation](https://mojprvizalogaj.rs/)
- [View the source code on GitHub](https://github.com/Arminbusatlic72/abandoned-cart-capture)
