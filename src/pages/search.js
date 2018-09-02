import PropTypes from "prop-types";
import React from "react";

require("core-js/fn/array/find");

import Article from "../components/Article";
import Search from "../components/Search";
import { ThemeContext } from "../layouts";
import Seo from "../components/Seo";

const SearchPage = props => {
  console.log('property');
  console.log(props);

    const {
      data: {
        posts: { edges: posts },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = props;

    // Create category list
    const categories = {};
    posts.forEach(edge => {
      const {
        node: {
          frontmatter: { category }
        }
      } = edge;

      if (category && category != null) {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(edge);
      }
    });

    const categoryList = [];

    for (var key in categories) {
      categoryList.push([key, categories[key]]);
    }

  return (
    <React.Fragment>

      {/* --- STYLES --- */}
      <style jsx>{`
        .icon {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .icon :global(svg) {
          height: 30px;
        }
      `}</style>
    </React.Fragment>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;

//eslint-disable-next-line no-undef
export const guery = graphql`
  query SearchQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            cover {
              children {
                ... on ImageSharp {
                  sizes(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
