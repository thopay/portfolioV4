---
layout: ../../layouts/BlogPostLayout.astro
title: Building the Iowa State TREND Fashion Magazine Website
description: Dive into the nitty-gritty of how I conceptualized, designed, and implemented the TREND Magazine website at Iowa State University. Explore the tech stack used, challenges encountered, and how the project shaped my software engineering skills.
date: 7/13/23
icon: ic:baseline-construction
---
# A Journey from Idea to Implementation

Web design, like any other creative endeavor, requires a blend of technical skills and artistic vision. In this post, I'll share my journey of building the TREND Magazine website for Iowa State University, from the initial concept to the final product.

## The Concept

The goal was to create a full-stack blog for [TREND Magazine](https://TrendMagISU.com), Iowa State's premier fashion publication. The website needed to be visually appealing to match the magazine's aesthetic while being user-friendly and cost-efficient.

## The Design

The design process began with creating a UI mockup using [Figma](https://www.figma.com/). Collaborating with TREND Magazine's Editor-In-Chiefs, we defined the look and feel of the website. Our focus was on simplicity, elegance, and user convenience.

![UI Mockup](/trend_mockup.png)

## The Tech Stack

Next, we had to translate the Figma mockups into a functioning website. We chose the following tech stack:

- **Frontend**: Next.js with React and Tailwind CSS for a fast and responsive UI.
- **Backend**: GraphQL, Strapi, and Postgres to host the website content.
- **Deployment**: The frontend was deployed to Vercel and backend to Railway for cost-efficiency.

Here's an example of how we translated the designs to code:

```javascript
// Sample Next.js component
import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      // Your JSX code here
    </div>
  );
}
```

## The Challenges

Building the TREND Magazine website wasn't without its challenges. Ensuring that the website was visually consistent across different devices and screen sizes required meticulous CSS work. Regularly testing on different browsers and devices was crucial to ensure a seamless user experience.

## The Impact

The new TREND Magazine website has been a great success, with the magazine's online presence significantly enhanced. This project was a valuable learning experience in terms of honing my full-stack development skills and understanding the intricacies of web design and deployment.

In conclusion, the journey of building the TREND Magazine website was both challenging and rewarding. It allowed me to apply my software engineering knowledge in a real-world project while fostering my creativity. I look forward to more such projects in the future!

_To experience the final result of our efforts, visit [TREND Magazine](https://TrendMagISU.com)_.
