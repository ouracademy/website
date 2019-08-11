// TODO:
// Validate author
// Add tags
// Tags, description recommend based on analytics keyword
// Store author id
// Automatic author based on github profile
// Automatic date based on commit date

const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const Joi = require("@hapi/joi");

const generateTemplateOf = require("./template");

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
          .max(60)
          .error(errors =>
            errors.map(error => {
              switch (error.type) {
                case "string.max":
                  error.message = SEOsuggestion(
                    error.context.limit,
                    "https://moz.com/learn/seo/title-tag"
                  );
              }

              return error;
            })
          )
      )
    },
    {
      name: "description",
      message: "Describe it but in an engaging way",
      validate: validateInput(
        Joi.string()
          .allow("")
          .max(160)
          .error(errors =>
            errors.map(error => {
              switch (error.type) {
                case "string.max":
                  error.message = SEOsuggestion(
                    error.context.limit,
                    "https://www.seoclarity.net/resources/knowledgebase/write-perfect-meta-description-seo-17115/"
                  );
              }

              return error;
            })
          )
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
    fs.writeFile(postPath, generateTemplateOf(view), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(
        `Post created as a draft, at ${postPath}, start writing 😃\n` +
          `Remember to remove the "isPublic: false" to publish your post\n` +
          "Don't know mdx? You could guide yourself by seeing other .mdx files or see https://www.gatsbyjs.org/docs/mdx/markdown-syntax/"
      );
    });
  });
