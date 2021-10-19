import React, {useContext, useState} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useInput from "../hooks/useInput";
import {client, uploadImage} from "../utils";
import { timeSince } from "../utils";
import { MoreIcon, CommentIcon, InboxIcon } from "./Icons";
import {toast} from "react-toastify";
import Button from "../styles/Button";
import { FeedContext } from "../context/FeedContext";

export const PostWrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.white};
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    display: flex;
    justify-content: center;
    position: relative;
    top: 3px;
    list-style-type: none;
    width: 100%;
    height: 100%;
  }

  li {
    margin-left: 1rem;
    align-items: center;
    vertical-align: center;
    height: 100%;
  }
  
  h1 {
    margin-left: 2rem;
    width: 80%;
  }
  
  span {
    width: 300px
  }

  textarea {
    margin-top: 1rem;
    height: 40px;
    width: 100%;
    font-family: "Fira Sans", sans-serif;
    font-size: 2rem;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    resize: none;
  }

  @media screen and (max-width: 950px) {
    width: 100%;
    .post-img {
      width: 100%;
    }
  }
  
  @media screen and (max-width: 900px) {
    width: 480px;
    .post-img {
      width: 325px;
    }
  }
`;

const CreatePost = ({ post }) => {
    const history = useHistory();
    const [postImage, setPostImage] = useState("");
    const { feed, setFeed } = useContext(FeedContext);
    const caption = useInput("");

    // TODO: implement minting function
    const handleSubmitPost = () => {
        if (!caption.value) {
            return toast.error("Please write something");
        }


        const tags = caption.value
            .split(" ")
            .filter((caption) => caption.startsWith("#"));

        const cleanedCaption = caption.value
            .split(" ")
            .filter((caption) => !caption.startsWith("#"))
            .join(" ");

        caption.setValue("");

        const newPost = {
            caption: cleanedCaption,
            files: [postImage],
            tags,
        };

        client(`/posts`, { body: newPost }).then((res) => {
            const post = res.data;
            post.isLiked = false;
            post.isSaved = false;
            post.isMine = true;
            setFeed([post, ...feed]);
            window.scrollTo(0, 0);
            toast.success("Your post has been submitted successfully");
        });
    };

    return (
        <PostWrapper>
            <h1>
                <span className="caption bold">
                    <textarea
                        placeholder="address"
                        value={caption.value}
                        onChange={caption.onChange}
                    />
                </span>
                <span className="caption ">
                    <textarea
                        placeholder="price"
                        value={caption.value}
                        onChange={caption.onChange}
                    />
                </span>
            </h1>
            <ul>
                <li>
                    <Button
                        secondary
                        onClick={() => toast.success("function not added")}
                    >
                        post
                    </Button>
                </li>
            </ul>
        </PostWrapper>
    );
};

export default CreatePost;
