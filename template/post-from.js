const slugify = require("slugify");
const path = require("path");
const format = require("date-fns/format");

const slug = text =>
  slugify(text, {
    remove: /[,*+~.()'"!:@]/g, // regex to remove characters
    lower: true // result in lower case
  });

const getPostPath = text => path.join("src/posts", slug(text) + ".mdx");

const postFrom = answers => ({
  ...answers,
  date: format(new Date(), "yyyy-MM-dd"),
  path: getPostPath(answers.title)
});

module.exports = postFrom;
