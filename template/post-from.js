const slugify = require("slugify");
const path = require("path");
const format = require("date-fns/format");

const slug = text => slugify(text).toLowerCase();
const getPostPath = text => path.join("src/posts", slug(text) + ".mdx");

const postFrom = answers => ({
  ...answers,
  date: format(new Date(), "yyyy-MM-dd"),
  path: getPostPath(answers.title)
});

module.exports = postFrom;
