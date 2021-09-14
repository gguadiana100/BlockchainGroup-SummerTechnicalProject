import React, {useContext, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Routing from "./Routing";
import {UserContext} from "./context/UserContext";
import {ThemeContext} from "./context/ThemeContext";

import Web3 from 'web3'
import {user1} from "./utils/FakeBackend";
import {client} from "./utils";
import Loader from "./components/Loader";

const App = () => {
    const {user, setUser} = useContext(UserContext);
    const {theme} = useContext(ThemeContext);

    const [loading, setLoading] = useState(true);
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadAddress = async () => {
        const web3 = window.web3
        // make sure app is connected to blockchain
        const accounts = await web3.eth.getAccounts()
        if (typeof accounts[0] === 'string' && accounts[0] !== '') {
            toast.success(`app login success ${accounts[0]}`);
            setUser({
                "address" : accounts[0]
            })
        }
    }

    const fetchData = async () =>{
        if (constructorHasRun) return;
        await loadWeb3();
        await loadAddress();
        if (user) {
            client("/auth/me").then((res) => {
                setUser(res.data);
                setLoading(false);
            });
        }
        setConstructorHasRun(true);
    }
    fetchData();

    if (loading) {
        return <Loader />;
    }

    return (
        <StyledThemeProvider theme={theme}>
            <GlobalStyle/>
            <ToastContainer autoClose={1000} closeButton={false}/>
            <Routing/>
        </StyledThemeProvider>
    );
};

export default App;
