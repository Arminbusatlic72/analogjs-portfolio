---
title: "Portikla BOGO Promotion Plugin"
timePeriod: "Ongoing"
technology: "WordPress, WooCommerce, PHP, JavaScript, and CSS3"
featuredImage: "/projects/portikla-bogo.png"
projectImage: "/projects/portikla-bogo/settings-redacted.png"
projectImageSec: "/projects/portikla-bogo.png"
slug: "portikla-bogo-plugin"
order: 25
link: "https://mojprvizalogaj.rs/"
description: "A custom WooCommerce promotion plugin that applies flexible Buy Two, Pay for One discounts across selected products, with mix-and-match pairing, configurable pricing and taxes, storefront messaging, badges, and responsive campaign popups."
tools: "WordPress, WooCommerce, PHP, JavaScript, CSS3, Elementor, Astra Pro, Performance Optimization"
company: "Finesa d.o.o."
previousProject: abandoned-cart-recovery-plugin
nextProject:
---

# Challenge

The business needed a Buy Two, Pay for One campaign that worked across a configurable group of products rather than a single fixed pair. Customers had to be able to mix eligible products, while WooCommerce still calculated accurate prices, taxes, and totals for any quantity.

The promotion also needed visible storefront communication so customers could discover the offer and understand when another item would unlock the discount.

## Role and responsibilities

I developed the custom WooCommerce promotion plugin. My responsibilities included:

- Building automatic mix-and-match BOGO calculations for administrator-selected products.
- Pairing eligible quantities and making the cheapest item in each pair free.
- Supporting regular, sale, and administrator-defined promotional prices.
- Distributing discounts across cart items for accurate totals and tax treatment.
- Building settings, product previews, ID validation, configurable notices, and administrator debugging.
- Adding product and shop badges plus an optional responsive, delayed campaign popup.
- Recalculating the promotion after cart changes and showing paid and free quantities clearly.

## Technical decisions

### Cheapest-item pairing

Eligible cart units are evaluated in price order so the cheapest item in every pair receives the free-item discount. This supports mixed products and multiple pairs without relying on fixed product bundles.

### Distributed cart discounts

The promotion distributes its discount across the relevant cart items rather than showing an unrelated cart-level adjustment. This keeps product totals and tax-inclusive or tax-exclusive calculations aligned with WooCommerce behavior.

### Promotion controls outside the theme

Eligible products, pricing mode, notices, badges, and popup behavior are managed through plugin settings. Keeping the campaign logic outside Astra and Elementor makes it reusable and less vulnerable to presentation changes.

### Session-limited campaign popup

The optional responsive popup links directly to the shop and appears once per browser session, providing campaign visibility without repeatedly interrupting the same visitor.

## Result or measurable impact

The delivered plugin provides a reusable Buy Two, Pay for One campaign across selected WooCommerce products, including mixed-product pairing, multiple offers per order, accurate cart recalculation, and coordinated storefront promotion.

No verified campaign conversion or order-value metric was supplied, so none is claimed here.

## Screenshots

The screenshots show the WooCommerce BOGO configuration and the live promotional popup. Product identifiers and operational prices in the administration screen have been redacted.

## Links

- [View the website using the promotion tooling](https://mojprvizalogaj.rs/)
