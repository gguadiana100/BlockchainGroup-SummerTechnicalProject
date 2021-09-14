import React from "react";
import styled from "styled-components";
import Post from "./Post"

const Container = styled.div`
  width: 100%;

  .square {
    float: left;
    position: relative;
    width: 30%;
    padding-bottom: 15%; 
    padding-top: 15%;
    margin: 1.66%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }

  .content {
    position: absolute;
    height:100%; 
    width: 100%; 
    overflow: hidden;
  }

  .table {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: end;
  }

  .table-cell {
    display: table-cell;
    vertical-align: middle;
    align-content: center;
    height: 100%;
    width: 100%;
  }

  img{
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    border-radius: 4px;
  }

  @media screen and (max-width: 650px) {
    .square {
      width: 48%;
      padding-bottom: 24%;
      padding-top: 24%;
      margin: 1%;
    }
  }
  @media screen and (max-width: 350px) {
    .square {
      width: 98%;
      padding-bottom: 49%; 
      padding-top: 49%;
      margin: 1%;
    }
  }
`;

const PostPreview = ({posts}) => {
    return (
        <Container>
            {posts?.map((post) => (
                <div className="square">
                    <div className="content">
                        <div className="table">
                            <div className="table-cell">
                                <Post key={post._id} post={post} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default PostPreview;
