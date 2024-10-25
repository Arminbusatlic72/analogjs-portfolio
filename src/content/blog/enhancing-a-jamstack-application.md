---
title: "Enhancing a JAMstack Application: Next/Previous Navigation and Dynamic Ordering for WordPress Custom Post Types in Gatsby"
slug: enhancing-a-jamstack-application
description: In this guide, we explore adding robust navigation and custom ordering to a Gatsby-fronted, WordPress-backed JAMstack app. From configuring page navigation in Gatsby templates to tweaking build commands for optimal caching on Netlify, we’ve got you covered.
coverImage: /blog/wpgatsby.webp
previousPost: "nextjs-vs-gatsby"
nextPost: ""
---

# Angular Signals: Enhancing a JAMstack Application: Next/Previous Navigation and Dynamic Ordering for WordPress Custom Post Types in Gatsby

Recently, I was asked to extend functionality in a JAMstack application using WordPress as the backend and Gatsby as the frontend, deployed on Netlify. The application includes custom post types ("Partners" and "Projects") stored in WordPress. My goal was twofold:

1. Add previous and next navigation for these custom post types, enabling users to move easily between individual partner or project pages.
2. Implement reorder functionality for "Partners" and "Projects," ensuring that changes made in WordPress were immediately reflected on the frontend.
   Here's a detailed look at how I achieved this, along with code examples.

## 1. Adding Next and Previous Navigation for Custom Post Types in Gatsby

To navigate between posts, we need to pass data for the next and previous posts through Gatsby’s createPage API. This requires making adjustments in both the gatsby-node.js file and the template for rendering each post.

### Step 1: Modify `gatsby-node.js`

To implement the functionality for navigating between previous and next items for custom post types like Partners and Projects, you need to modify the `gatsby-node.js` file. This is where you can create new GraphQL queries to fetch the necessary data for each page.

First, open your `gatsby-node.js` file and add the following code to create pages for your custom post types. You'll need to use the `createPages` API to define how these pages are generated.

```javascript
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query for Partners and Projects
  const result = await graphql(`
    {
      allWpPartner {
        edges {
          node {
            id
            slug
          }
        }
      }
      allWpProject {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  // Create pages for Partners
  result.data.allWpPartner.edges.forEach(({ node }, index) => {
    const previousPartner = index === 0 ? null : result.data.allWpPartner.edges[index - 1].node;
    const nextPartner = index === result.data.allWpPartner.edges.length - 1 ? null : result.data.allWpPartner.edges[index + 1].node;

    createPage({
      path: `/partners/${node.slug}/`,
      component: path.resolve(`src/templates/partner-template.js`),
      context: {
        id: node.id,
        previousPartner,
        nextPartner,
      },
    });
  });

  // Create pages for Projects
  result.data.allWpProject.edges.forEach(({ node }, index) => {
    const previousProject = index === 0 ? null : result.data.allWpProject.edges[index - 1].node;
    const nextProject = index === result.data.allWpProject.edges.length - 1 ? null : result.data.allWpProject.edges[index + 1].node;

    createPage({
      path: `/projects/${node.slug}/`,
      component: path.resolve(`src/templates/project-template.js`),
      context: {
        id: node.id,
        previousProject,
        nextProject,
      },
    });
  });
};
```

### Step 2: Use Navigation Data in the Template

In the `project.js` template, you will retrieve the `previousProject` and `nextProject` from the page context. This allows you to conditionally render navigation links based on whether these properties exist.

### Implementation

Here's how to implement the navigation links in your `project.js` template:

```javascript
import React from "react";
import { Link } from "gatsby";

const ProjectTemplate = ({ pageContext }) => {
  const { previousProject, nextProject } = pageContext;

  return (
    <div>
      {/* Project content goes here */}

      <div className="navigation-links-wrapper">
        {previousProject && (
          <Link to={`/projects/${previousProject.slug}`} className="navigation-link previous-link">
            &larr; {previousProject.title}
          </Link>
        )}
        {nextProject && (
          <Link to={`/projects/${nextProject.slug}`} className="navigation-link next-link">
            {nextProject.title} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectTemplate;
```

## Enabling Reordering of Custom Post Types and Addressing Cache Issues

In WordPress, I used a post reordering plugin to adjust the order of custom post types dynamically. However, I encountered an issue where these order changes were not reflected in Gatsby’s frontend immediately, as Gatsby's GraphQL cache did not detect the order change. To resolve this, I updated the Netlify build settings to clear Gatsby’s cache before each build.

### Step 1: Setting Up the Reordering Plugin in WordPress

First, I installed a WordPress plugin "Post Types Order" to reorder custom post types (Partners and Projects) using a Drag and Drop Sortable javascript capability. This allowed me to easily rearrange posts in the WordPress admin panel, saved them and by triggering build hook initiate build on Netlify. However, I encountered an issue where these order changes were not reflected in Gatsby’s frontend immediately, as Gatsby's GraphQL cache did not detect the order change. To resolve this, I updated the Netlify build settings to clear Gatsby’s cache before each build.

### Step 2: Modify the Build Command in Netlify

In Netlify, the default build command for Gatsby (gatsby build) does not account for order changes, as the cached GraphQL layer isn’t updated. By clearing the cache, we force Gatsby to re-fetch data from WordPress, including the updated order.

To do this, update the build command in the Netlify build settings from:

```bash
gatsby build

```

to

```bash

gatsby clean && gatsby build
```

This command first clears Gatsby’s cache (gatsby clean) and then builds the site, ensuring that the latest post order is applied.

## Conclusion

With these changes, the application now has functional navigation between custom posts and supports dynamic reordering. The addition of gatsby clean && gatsby build in the Netlify settings resolves caching issues, making it a powerful approach for JAMstack applications using Gatsby and WordPress.
