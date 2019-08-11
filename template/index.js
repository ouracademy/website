const Mustache = require("mustache");

const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const Joi = require("@hapi/joi");

const slug = text => slugify(text).toLowerCase();
const getPostPath = text => path.join("src/posts", slug(text) + ".mdx");

const SEOsuggestion = (length, url) =>
  `Please don't exceed ${length} characters, this is for SEO purposes 😉. \n` +
  `More on ${url} \n`;

const validateInput = schema => input => {
  const { error } = Joi.validate(input, schema);
  return error ? error.message : true;
};

console.log("Hi 🤖! I'll help you write a post");
inquirer
  .prompt([
    {
      name: "title",
      message: "Enter it's title:",
      validate: validateInput(
        Joi.string()
          .allow("")
          .max(60)
      )
    },
    {
      name: "description",
      message: "Describe it but in an engaging way",
      validate: validateInput(
        Joi.string()
          .allow("")
          .max(160)
      )
    },
    {
      name: "author",
      message: "Identify you, by putting your author id - see authors.yml:"
    },
    {
      name: "imageURL",
      message:
        "Enter an image url, this is used when you share your post on Twitter or Facebook:",
      validate: validateInput(
        Joi.string()
          .allow("")
          .uri()
      )
    }
  ])
  .then(answers => {
    const format = require("date-fns/format");
    const view = {
      ...answers,
      date: format(new Date(), "yyyy-MM-dd"),
      tags: ["historia", "personajes del software", "desarrollo de software"]
    };

    const postPath = getPostPath(view.title);
    fs.writeFile(postPath, newPost(view), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(`Post created as a draft, at ${postPath}, start writing 😃`);
      console.log(
        `Remember to remove the "isPublic: false" to publish your post`
      );
      console.log(
        "Don't know mdx? You could guide yourself by seeing other .mdx files or see https://www.gatsbyjs.org/docs/mdx/markdown-syntax/"
      );
    });
  });

const newPost = view =>
  Mustache.render(
    `---
title: {{title}}
date: {{date}}
author: {{author}}
tags: [tag-1, tag-2]
{{#description}}
description: {{description}}
{{/description}}
{{#imageURL}}
image: {{{imageURL}}}
{{/imageURL}}
isPublic: false # this post is a draft, you can share it's link to 
# other people to review your post. Remove this property to publish it.
---

Your content in markdown but with the power of JSX. MDX!`,
    view
  );

// TODO:
// Validate author
// Add tags
// Tags, description recommend based on analytics keyword
// Store author id
// Automatic author based on github profile
// Automatic date based on commit date
