import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import PostPreview from "../components/PostPreview";
import Loader from "../components/Loader"; 
import { client } from "../utils";
import Posts from "../contracts/Posts.sol";
import {toast} from "react-toastify";
import {UserContext} from "../context/UserContext";
import {FeedContext} from "../context/FeedContext";
import Web3 from 'web3'
import {user1} from "../utils/FakeBackend";

const Wrapper = styled.div`
  h2 {
    padding: 1rem;
  }
`;

const Explore = () => {
  const { setUser } = useContext(UserContext);
  const { feed, setFeed } = useContext(FeedContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client("/posts/bidding").then((res) => {
      setFeed(res.data);
      setLoading(false);
    });

  }, [setFeed]);



  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <h2>Explore</h2>
      <PostPreview posts={feed} />
    </Wrapper>
  );
};

export default Explore;
