// TODO:
// Tags, description recommend based on analytics keyword
// Store author id
// Automatic author based on github profile
// Automatic date based on commit date

const yaml = require("js-yaml");
const fs = require("fs");
const inquirer = require("inquirer");
const Joi = require("@hapi/joi");

const generateTemplateOf = require("./template");
const postFrom = require("./post-from");

const authors = yaml
  .safeLoad(fs.readFileSync("src/posts/author.yaml"))
  .map((x) => x.id);

const SEOsuggestion = (length, url) =>
  `Please don't exceed ${length} characters, this is for SEO purposes 😉. \n` +
  `More on ${url} \n`;

const validateInput = (schema) => (input) => {
  const { error } = schema.validate(input);
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
          .error((errors) =>
            errors.map((error) => {
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
      ),
    },
    {
      name: "description",
      message: "Describe it but in an engaging way",
      validate: validateInput(
        Joi.string()
          .allow("")
          .max(160)
          .error((errors) =>
            errors.map((error) => {
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
      ),
    },
    {
      type: "list",
      name: "author",
      message: "Identify you, by putting your author id - see authors.yml:",
      choices: authors,
    },
    {
      name: "imageURL",
      message:
        "Enter an image url, this is used when you share your post on Twitter or Facebook:",
      validate: validateInput(Joi.string().allow("").uri()),
    },
    {
      name: "tags",
      message: "Tag your post (separated by commas):",
    },
  ])
  .then((answers) => {
    const post = postFrom(answers);
    fs.writeFileSync(post.path, generateTemplateOf(post));
    console.log(
      `Post created as a draft, at ${post.path}, start writing 😃\n` +
        `Remember to remove the "isPublic: false" to publish your post\n` +
        "Don't know mdx? You could guide yourself by seeing other .mdx files or see https://www.gatsbyjs.org/docs/mdx/markdown-syntax/"
    );
  });
