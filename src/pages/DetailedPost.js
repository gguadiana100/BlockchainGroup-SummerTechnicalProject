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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas: 
    "header header"
    "nft_img bid_history" 
    "footer footer";

  
  .header {
    grid-area: header;
    border: 1px solid ${(props) => props.theme.borderColor};
  }

  .nft-image {
    grid-area: nft_img;
    border-left: 1px solid ${(props) => props.theme.borderColor};
    border-right: 1px solid ${(props) => props.theme.borderColor};
  }

  .bid-history {
    grid-area: bid_history;
    border-right: 1px solid ${(props) => props.theme.borderColor};
  }

  .footer {
    grid-area: footer;
    border: 2px solid ${(props) => props.theme.borderColor};
  }

  /* .post-info {
    border: 1px solid ${(props) => props.theme.borderColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  } */

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

  .add-bid {
    display: grid;
    grid-template-columns: 5fr 5fr 5fr 2fr;
    grid-gap: 1rem;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    padding: 1rem;
  }

  .input-container {
    border: 1px solid ${(props) => props.theme.borderColor};
    /* border-radius: 1rem; */
    display: grid;
    grid-template-columns: 6fr 1fr;
    overflow: hidden;
  }

  .units-field {
    text-align: center;
    padding: 1rem;
    background-color: lightgray;
  }

  input {
    padding: 1rem;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.bg};
    border: none;
    resize: none;
    text-align: center;
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

  button {
    font-size: 1rem;
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

    .add-bid {
      display: flex;
      flex-direction: column;
    }

    .bid-history {
      border-left: 1px solid ${(props) => props.theme.borderColor};
      max-height: 200px;
    }
`;

const DetailedPost = () => {
  const history = useHistory();
  const { postAddress } = useParams();

  const [loading, setLoading] = useState(true);
  const [deadend, setDeadend] = useState(false);
  const [post, setPost] = useState({});

  const newAmount = useInput("");
  const newInterest = useInput("");
  const newDuration = useInput("");
  const [bids, setBids] = useState([]);

  const handleAddBid = (e) => {
    newAmount.setValue("");
    newInterest.setValue("");
    newDuration.setValue("");
    // TODO: implement bidding function
    return toast.success("Sorry, the bid feature isn't finished yet");
  };

  // TODO: implement bidding history visibility control
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

      <div className="header">
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
          <div className="auction-details"><h1>AUCTION DETAILS</h1></div>
          <div className="post-header">
            <CloseIcon onClick={() => history.goBack()} />
          </div>
        </div>
      </div>

      <div className="nft-image">
        <img
          className="post-img"
          src={post?.file}
          alt="post"
        />
      </div>

      <div className="bid-history">
        <div className="bids">
            {bids.map((bid) => (
              <Bid user={bid.user} amount={bid.amount} duration={bid.duration} interest={bid.interest}/>
            ))}
        </div>
      </div>

      <div className="footer">
        <div className="add-bid">
          <div className="input-container">
            <input
              className="amount-field"
              type="number"
              placeholder="Loan Amount"
              min="0.01"
              step="0.01"
              value={newAmount.value}
              onChange={newAmount.onChange}
            />
            <span className="units-field">ETH</span>
          </div>
          <div className="input-container">
            <input
              className="duration-field"
              type="number"
              placeholder="Loan Duration"
              min="1"
              value={newDuration.value}
              onChange={newDuration.onChange}
            />
            <span className="units-field">Mos</span>
          </div>
          <div className="input-container">
            <input
              className="interest-field"
              type="number"
              placeholder="Interest Rate"
              min="0"
              step="0.25"
              value={newInterest.value}
              onChange={newInterest.onChange}
            />
            <span className="units-field">%</span>
          </div>
          <button onClick={handleAddBid}>Place Bid</button>
        </div>
      </div>

    </Wrapper>
  );
};

export default DetailedPost;
