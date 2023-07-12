---
layout: ../../layouts/BlogPostLayout.astro
title: My LeetCode Journey
description: Dive into my personal experience with LeetCode. From initial struggles to eventual success, I'll share my tips, strategies, and how perseverance helped me improve my coding skills.
date: 7/11/23
icon: simple-icons:leetcode
---
# My LeetCode Journey: Conquering Coding Challenges

Coding challenges are a rite of passage for many software engineering students and tech enthusiasts. They can be tedious, frustrating, and exciting all at once. In today's blog post, I'll be sharing my journey of tackling these brain teasers on LeetCode, a popular coding challenge platform. From solving my first medium difficulty problem to slowly mastering those seemingly impossible ones — it's been a wild ride. 

## Getting Started: Falling (Hard) for Mediums  

The initial excitement of diving into LeetCode was quickly replaced by a harsh realization - this stuff was hard! My experience with languages like Java, Python, and C++ seemed barely enough to scrape by. The problems labeled "medium" difficulty level felt like monstrous riddles waiting to crush my delicate coder spirit.

```javascript
function longestConsecutiveLength(array) {
  array.sort((a, b) => a - b);
  let maxLength = 1;
  let currentLength = 1;
  for (let i = 1; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
      if (array[i] === array[i - 1] + 1) {
        currentLength++;
      } else {
        maxLength = Math.max(maxLength, currentLength);
        currentLength = 1;
      }
    }
  }
  return Math.max(maxLength, currentLength);
}
```

But with perseverance and a whole lot of late-night Googling, I slowly built up my understanding of the algorithms and data structures that were key to solving these problems. 

## Acing the Skills: Practice Makes Perfect

Aside from the obvious coding practice you get from LeetCode, there is also a lot of learning that takes place. I picked up on patterns that repeat across problems, read up on different algorithms, and worked towards a better understanding of time and space complexity. In essence, I was learning how to think computationally and logically. 

## From Frustration to Satisfaction: Seeing the Breakthrough

The pride and satisfaction I felt the day I cracked my first hard problem in under an hour, well - it was nothing short of exhilarating. It made all the previous sleepless nights and the strained brain cells feel worth it. It showed me that this is not an overnight journey, but rather a marathon. Have faith in the process and be patient with yourself. 

> "Give a man a program, frustrate him for a day.
> Teach a man to program, frustrate him for a lifetime." - Waseem Latif

## Coding Challenges and Real-World Experience

Working on real-time projects at my internship with John Deere and as the Executive Web Designer for the Iowa State TREND Fashion Magazine equipped me with hands-on practice. I diagnosed and designed solutions for clients, implemented payment methods, and experienced full stack development. The experience has been invaluable, and I feel it has greatly complemented my learning process with LeetCode. 

It's been quite the rollercoaster so far, but I'm excited to see where the ride goes from here. And, remember, the next time you stare blankly at a coding problem for hours, you're not alone! Happy coding, everyone.

> "Searching a problem in Google or Stack Overflow, finding exactly the same problem with no solution: Welcome to Programming." - Unknown