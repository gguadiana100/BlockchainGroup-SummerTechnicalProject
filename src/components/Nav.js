import React, {useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import {UserContext} from "../context/UserContext";
import {HomeIcon, CloseIcon, SearchIcon, ExploreIcon, HeartIcon} from "./Icons";
import {toast} from "react-toastify";
import Button from "../styles/Button";
import {client} from "../utils";

import {user1} from "../utils/FakeBackend";
import Web3 from "web3";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 2rem 0;
  z-index: 10;

  .nav-logo {
    position: relative;
    top: 6px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
  }

  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }

  li {
    margin-left: 1rem;
    align-items: center;
  }

  @media screen and (max-width: 970px) {
    nav {
      width: 90%;
    }
  }
`;

const Nav = () => {
    const {user, setUser} = useContext(UserContext);
    const { ethereum } = window

    const handleDisconnect = () => {
        setUser(null);
        localStorage.removeItem("user");
        toast.success("You are logged out");
    };
    // TODO: check if metamask is installed
    const handleConnect = async (e) => {
        try {
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            if (typeof accounts[0] === 'string' && accounts[0] !== '') {
                client("/auth/me").then((res) => {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    toast.success(`login success ${accounts[0]}`);
                });
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <NavWrapper>
            <nav>
                <Search/>
                <ul>
                    <li>
                        <Link to="/explore">
                            <ExploreIcon/>
                        </Link>
                    </li>
                    {user ? (
                        <li>
                            <Link to={`/${user.address}`}>
                                <img
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        objectFit: "cover",
                                        borderRadius: "12px",
                                    }}
                                    src="https://www.w3schools.com/css/img_lights.jpg"
                                    alt="avatar"
                                />
                            </Link>
                        </li>
                    ) : (
                        <li>
                        </li>
                    )}
                    {user ? (
                        <li>
                            <Link to="/explore">
                                <Button secondary onClick={() => handleDisconnect()}>
                                    disconnect
                                </Button>
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Button onClick={() => handleConnect()}>
                                connect
                            </Button>
                        </li>
                    )}
                </ul>
            </nav>
        </NavWrapper>
    );
};

export default Nav;
