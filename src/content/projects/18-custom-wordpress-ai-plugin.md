---
title: "Custom WordPress AI Plugin - Contract Analyzer"

timePeriod: "July 2025"
technology: "WordPress, PHP, JavaScript, OpenAI API, Python"

featuredImage: "/projects/contract-analyzer-front.png"
projectImage: "/projects/contract-analyzer/contract-analyzer.png"

slug: contract-analyzer
order: 17
link: "https://contractreader.us/contract-analyzer-2/"

description: "Developed a custom WordPress plugin that accepts PDF and Word documents, converts them to text through a Python service, processes the extracted content through a configurable language-model endpoint, and emails users an expiring private link to the result."

tools: "Visual Studio Code, WordPress, PHP, JavaScript, Python, OpenAI API, Git"

company: Grumpy Dev

previousProject: kue-tech
nextProject: action
---

# Challenge

The client needed to add AI-assisted contract analysis to an existing WordPress website without moving users into a separate product.

The workflow had to accept a user's email address and document, process potentially slow conversion and model requests away from the upload interaction, and deliver results privately. Site administrators also needed to change service endpoints and analysis prompts without editing plugin code.

## Role and responsibilities

I developed the custom WordPress plugin and its document-processing integration. My responsibilities included:

- Building a reusable shortcode-based upload form for PDF, DOC, and DOCX files.
- Validating requests, email addresses, file uploads, and allowed document types.
- Storing submission status, filenames, responses, expiry dates, and secure access tokens in a dedicated WordPress database table.
- Connecting WordPress to a Python document-conversion service and a configurable language-model API.
- Scheduling document processing asynchronously with WordPress cron.
- Emailing users a private result link after processing completes.
- Building an administration screen for conversion endpoints, model credentials, and prompt templates.

## Technical decisions

### A custom WordPress plugin and shortcode

The analysis flow needed to live inside an existing WordPress site. Packaging it as a plugin kept the upload form, processing hooks, database setup, and administration controls together, while a shortcode allowed the form to be placed on a page without template changes.

### Asynchronous processing with WordPress cron

PDF conversion and model requests can take longer than a normal form submission. The upload handler records a pending submission and schedules a single processing event, allowing the browser request to complete before conversion and analysis run.

### Separate Python conversion and language-model services

WordPress manages the user-facing workflow and submission lifecycle. A Python endpoint converts the uploaded document to text, after which a separately configurable model endpoint receives a prompt containing the extracted content.

### Expiring tokenized result delivery

Each submission receives a generated access token and a seven-day expiry time. When processing finishes, the plugin emails a private result URL and only displays completed, unexpired submissions matching that token.

## Result or measurable impact

A working document-analysis workflow was delivered inside WordPress. Users can submit PDF or Word documents, leave the page while processing continues, and receive an email linking to the completed analysis. Administrators can change conversion and model endpoints, credentials, and prompt templates from WordPress settings.

The available material does not include usage volume, processing-time comparisons, or analysis-accuracy metrics, so none are claimed here.

## Screenshots

The project image shown above documents the public contract-upload interface. A results or administration screenshot is not currently available.

## Links

- [Open the live Contract Analyzer](https://contractreader.us/contract-analyzer-2/)
