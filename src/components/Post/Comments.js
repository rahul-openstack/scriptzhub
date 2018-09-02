import React from "react";
import PropTypes from "prop-types";
import FacebookProvider, { Comments as FBComments } from "react-facebook";
import { DiscussionEmbed } from "disqus-react";

import config from "../../../content/meta/config";

const Comments = props => {
  const { facebook, slug, theme, title } = props;
  const disqusShortname = "disqus_47Z6ECQno0";
  const disqusConfig = {
    identifier: slug,
    title: title,
  };

  return (
    <React.Fragment>
      <div id="post-comments" className="comments">
        <FacebookProvider appId={facebook.appId}>
          <FBComments href={`${config.siteUrl}${slug}`} width="100%" colorscheme="light" />
        </FacebookProvider>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .comments {
          margin: 0 -8px ${theme.space.default};
        }
      `}</style>
    </React.Fragment>
  );
};

Comments.propTypes = {
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Comments;
