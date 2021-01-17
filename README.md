# Ouracademy

> Ouracademy is an organization that promoves the education in software development throught blog posts & videos 😃.

This website is created using [Gatsby](#resources), MDX & Grommet for UI. It uses many Gatsby plugins for offline, analytics (through Google Tag Manager), Syntax Highlight (through Prismjs) and GraphQL for fetching Github (to automatically generate versioning of posts).

It also has a `new-post` script to help you create new posts using inquirer.js.

![npm run new-post command in action](static/cli.gif)

---

## How write a post

- Clone this repository

- Install & Run it following [this steps](#development)

- Create .env file (similar to .env.sample file) and put your Github token there - this is used to fetch Github and versioning posts, [get your token here](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

- If you are a new author (put your information) in authors.yaml file.

- Run `npm run new-post` to create a new post

- Start writing, please follow this [guideline](#guide-for-commit-messages) to commit your post

### Guide for commit messages

We use [commit lint](https://conventional-changelog.github.io/commitlint/#/) in order to have a standard for commit messages. So if you create or update the content of a blog post, please use the `docs` type in your commit message, for example a commit message like `docs: new "post title"` is ok.

Also we use the `docs` type in our commit messages, to show a change history of every post (see `<History/>` component in `posts/template.js`).

---

## Development

```bash
npm install
npm run develop
```

Your site will run at `http://localhost:8000`!

> Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data.

### Some notes..🧐

We highly recommend that you install the recommended extensions if you use VS Code. It will make your development sweet 🍰

### Resources

This project use Gatsby. See more of it in its awesome[tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql), it has very useful resources not only to learn Gatsby but also GraphQL, React & plugins for any purpose...

If you don't know MDX, well it's just markdown & with JSX. So you could import components if you needed.

---

## License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
