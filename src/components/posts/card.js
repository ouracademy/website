export const query = graphql`
  fragment PostInfo on Mdx {
    id
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "DD MMMM, YYYY", locale: "es")
      image
      description
    }
    excerpt
  }
`;
