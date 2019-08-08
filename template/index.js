const Mustache = require("mustache");

const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const slug = text => slugify(text).toLowerCase();
const getPostPath = text => path.join("src/posts", slug(text) + ".mdx");

console.log("Hi! We'll help you write a post");
inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "Enter it's title:"
    },
    {
      name: "description",
      type: "input",
      message:
        "Describe it but in an engaging way to people - please don't exceed 160 characters, this is for SEO purposes 😉. \n" +
        "More on https://www.seoclarity.net/resources/knowledgebase/write-perfect-meta-description-seo-17115/ \n"
    },
    {
      name: "author",
      type: "input",
      message: "Identify you, by putting your author id (see authors.yml)"
    }
  ])
  .then(answers => {
    console.log(answers);

    const format = require("date-fns/format");
    const view = {
      title: answers.title,
      description: answers.description,
      date: format(new Date(), "yyyy-MM-dd"),
      author: answers.author,
      tags: ["historia", "personajes del software", "desarrollo de software"],
      image: "https://pbs.twimg.com/media/D-ZG3OWXsAAruSS?format=png&name=small"
    };

    const postPath = getPostPath(view.title);
    fs.writeFile(postPath, newPost(view), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(`Post created at ${postPath}, start writing 😃`);
      console.log(
        "Don't know mdx? You could guide yourself by seeing other .mdx files or see https://www.gatsbyjs.org/docs/mdx/markdown-syntax/"
      );
    });
  });

const newPost = view =>
  Mustache.render(
    `---
title: {{title}}
image: {{image}}
date: {{date}}
author: {{author}}
tags: [tag-1, tag-2]
description: some desc # optional, default to an excerpt of the post
---

Your content in markdown but with the power of JSX. MDX!
`,
    view
  );
