# Ouracademy

> Ouracademy is an organization that promoves the education in software development throught blog posts & videos 😃.

## 🚀 Development

```bash
npm install
npm run develop
```

Your site will run at `http://localhost:8000`!

> Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data.

#### Some notes..🧐

We highly recommend that you install the recommended extensions if you use VS Code. It will make your development sweet 🍰

### How to add a post?

Just create a .mdx file at src/posts

> Note: you could copy & paste from any of the mdx files there as a guide

Then put a frontmatter in YAML

```yaml
---
title: Post title
image: https://some.com/image-url.png
description: some desc
date: 2018-11-06 # in format yyyy-mm-dd
author: your-author-id # see below
tags: [tag-1, tag-2]
---
Here your content (in markdown but with the power of JSX)
```

Remember that if you are a new author (put your information) in authors.yaml file.

### Resources

This project use Gatsby. See more of it in its awesome[tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql), it has very useful resources not only to learn Gatsby but also GraphQL, React & plugins for any purpose...

If you don't know MDX, well it's just markdown & with JSX. So you could import components if you needed.

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
