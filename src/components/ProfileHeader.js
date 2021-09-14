import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { OptionsIcon } from "./Icons";
import {client} from "../utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 2rem;

  .avatar {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 90px;
    margin-right: 2rem;
  }

  .profile-meta {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .profile-meta h2 {
    position: relative;
    top: 3px;
  }

  .profile-stats {
    display: flex;
    margin-bottom: 1rem;
  }

  .options svg {
    position: relative;
    top: 7px;
    margin-left: 1rem;
  }

  span {
    padding-right: 1rem;
  }

  a {
    color: ${(props) => props.theme.blue};
  }

  @media screen and (max-width: 645px) {
    font-size: 1rem;
    
    .profile-stats {
      display: none;
    }

    .avatar {
      width: 140px;
      height: 140px;
    }

    .profile-meta {
      flex-direction: column;
    }

    button {
      margin-left: 0;
    }
    
  }

  @media screen and (max-width: 420px) {
    font-size: 0.9rem;

    .avatar {
      width: 100px;
      height: 100px;
    }
  }
`;


const ProfileHeader = ({ profile }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("You are logged out");

    const user = await client("/auth/me");
    localStorage.setItem("user", JSON.stringify(user.data));
    setUser(user.data);
    toast.success("Login successful");
  };

  return (
    <>
      <Wrapper>
        <img className="avatar" src="https://www.w3schools.com/css/img_lights.jpg" alt="avatar" />
        <div className="profile-info">
          <div className="profile-meta">
            <h2>{profile?.username}</h2>
            {profile?.isMe ? (
              <div className="options">
                <OptionsIcon onClick={() =>
                    history.push("/accounts/edit")} />
              </div>
            ) : (
                <div></div>
            )}
          </div>

          <div className="profile-stats">
            <span>{profile?.address}</span>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ProfileHeader;
