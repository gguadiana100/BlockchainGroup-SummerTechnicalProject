import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../styles/Avatar";

const BidWrapper = styled.div`
  display: flex;

  span {
    padding-right: 0.4rem;
  }
`;

const Bid = ({ user, amount }) => {
    const history = useHistory();

    return (
        <BidWrapper style={{ padding: "0.4rem 0"  }}>
            <p>
                <span
                    onClick={() => history.push(`/${user}`)}
                    className="bold pointer"
                >
                  {user.substr(0,8)}
                </span>
                {amount} ETH
            </p>
        </BidWrapper>
    );
};

export default Bid;
