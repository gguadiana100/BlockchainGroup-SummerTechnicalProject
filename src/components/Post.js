import React, {useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import { timeSince } from "../utils";

export const PostWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.blue};
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .img-wrapper {
    display: flex;
    height: 70%;
    justify-content: center;
    padding: 0.5rem;
  }

  img {
    cursor: pointer;
    width: auto;
    height: auto;
    border-radius: 4px;
  }


  .post-footer {
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .username {
    padding-right: 0.3rem;
  }

`;

const Post = ({post}) => {
  const history = useHistory();

  return (
      <PostWrapper>
        <div className="img-wrapper">
          <img
              onClick={() => history.push(`/p/${post.address}`)}
              src={post.file}
              alt="post-img"
          />
        </div>


        <div className="post-footer">
            <div>
                <h6>
                    <span className="title bold">
                        {post.title}
                    </span>
                    <span className="secondary">
                      {" | posted by "}
                    </span>
                    <span
                        className="pointer"
                        onClick={() => history.push(`/${post.user}`)}
                    >
                        {post.user.substr(0,8)}
                    </span>
                </h6>
                <h6>
                    <span className="secondary"> {timeSince(post?.createdAt)} ago </span>
                </h6>
            </div>
            <div>
                <h6>
                    price:
                </h6>
                <h6>
                    <span className="title bold">
                        {post.price} ETH
                    </span>
                </h6>
            </div>
        </div>
      </PostWrapper>
  );
};

export default Post;
