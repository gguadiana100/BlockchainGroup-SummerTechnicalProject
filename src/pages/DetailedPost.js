import React, { useRef, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Placeholder from "../components/Placeholder";
import Avatar from "../styles/Avatar";
import Loader from "../components/Loader";
import useInput from "../hooks/useInput";
import { client } from "../utils";
import { timeSince } from "../utils";
import { CloseIcon, MoreIcon, CommentIcon, InboxIcon } from "../components/Icons";
import {toast} from "react-toastify";
import Bid from "../components/Bid"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
  
  .post-info {
    border: 1px solid ${(props) => props.theme.borderColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .post-header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }

  .post-header {
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  .post-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  


  svg {
    margin-right: 1rem;
  }

  input {
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.bg};
    border: none;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    resize: none;
    padding: 1rem 0 1rem 1rem;
    font-size: 1rem;
    font-family: "Fira Sans", sans-serif;
  }

  ul {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 3px;
    list-style-type: none;
    width: 100%;
  }

  li {
    margin-left: 1rem;
    align-items: center;
  }
  
  .bids {
      padding: 1rem;
      height: 100%;
      overflow-y: scroll;
  }
  
  .bids::-webkit-scrollbar {
      width: 0;
      height: 0;
  }

  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;

    .bids {
      height: 100%;
    }
  }
`;

const DetailedPost = () => {
  const history = useHistory();
  const { postAddress } = useParams();

  const [loading, setLoading] = useState(true);
  const [deadend, setDeadend] = useState(false);
  const [post, setPost] = useState({});

  const newBid = useInput("");
  const [bids, setBids] = useState([]);

  const handleAddBid = (e) => {
    if (e.keyCode === 13) {
      newBid.setValue("");
      return toast.success("Sorry, the bid feature isn't finished yet");
    }
  };

  useEffect(() => {
    client(`/posts/${postAddress}`)
      .then((res) => {
        setPost(res.data);
        setBids(res.data.bidHistory);
        setLoading(false);
        setDeadend(false);
      })
      .catch((err) => setDeadend(true));
  }, [postAddress]);

  if (!deadend && loading) {
    return <Loader />;
  }

  if (deadend) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text="The link you followed may be broken, or the page may have been removed"
      />
    );
  }

  return (
    <Wrapper>
      <img
        className="post-img"
        src={post?.file}
        alt="post"
      />

      <div className="post-info">
        <div>
          <div className="post-header-wrapper">
            <div className="post-header">
              <h3>
                {post?.title}
              </h3>
              <h5 className="pointer"
                  onClick={() => history.push(`/${post?.user}`)}>
                {`owned by ${post?.user.substr(0, 8)}`}
              </h5>
            </div>
            <div className="post-header">
              <CloseIcon onClick={() => history.goBack()} />
            </div>
          </div>
         <div className="bids">
             {bids.map((bid) => (
               <Bid user={bid.user} amount={bid.amount} />
             ))}
         </div>
        </div>
        <div className="add-bid">
          <input
            placeholder="Place a bid"
            value={newBid.value}
            onChange={newBid.onChange}
            onKeyDown={handleAddBid}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default DetailedPost;
