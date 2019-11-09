const Mustache = require("mustache");

const generateTemplateOf = post =>
  Mustache.render(
    `---
title: "{{title}}"
date: {{date}}
author: {{author}}
tags: [{{tags}}]
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
    post
  );

module.exports = generateTemplateOf;
