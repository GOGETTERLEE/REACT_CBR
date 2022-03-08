import React, {useEffect, useState } from 'react';
import Caver from 'caver-js';
import { stakingContractABI, stakingContractAddress } from "../constant/constant";
export const Context = React.createContext();


let caver;
if (typeof window.klaytn !== 'undefined') 
    caver = new Caver(window.klaytn); // caver 에 프로바이더를 박아야함, http로 박던지, 지갑에서 불러오던지 해야함.
else caver = new Caver('https://api.baobab.klaytn.net:8651/')

const createStakingContract = () => {
    const stakingContract = new caver.klay.Contract(stakingContractABI, stakingContractAddress)
    return stakingContract;
}


export const Provider = ({ children }) => {
    console.log("provider")
    const [currentAccount, setCurrentAccount] = useState("")
    const [genInfo, setGenInfo] = useState({})
    const [indInfo, setIndInfo] = useState({})

    const connectWallet = async () => {
        try {
          if (!window.klaytn) return alert('Please install KaiKas')
          const accounts = await window.klaytn.enable()
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error)
        }
      }
    const getGenInfo = async () => {
        try{
            if(!window.klaytn) return alert('Please install Kaikas')
            const stakingContract = createStakingContract();
            const [_currentRate, _realTimeIndex, _realTimeRound, _realTimeTVL] = await stakingContract.methods.getFrontGenInfo().call(); 
            const GenInfo = {currentRate : _currentRate, realTimeIndex : _realTimeIndex, realTimeRound : _realTimeRound, realTimeTVL : _realTimeTVL};
            console.log(GenInfo)
            setGenInfo(GenInfo);
        } catch(error) {
            console.log(error)
        }
    } 
    const getIndInfo = async () => {
        try{
            if(!window.klaytn) return alert('Please install Kaikas')
            const stakingContract = createStakingContract();
            const [_lastUpdateBalance, _realTimeIndRound, _realTimeBalance] = await stakingContract.methods.getFrontIndInfo().call({from:window.klaytn.selectedAddress}); 
            const IndInfo = {lastUpdateBalance : _lastUpdateBalance, realTimeIndRound : _realTimeIndRound, realTimeBalance : _realTimeBalance};
            setIndInfo(IndInfo);
            console.log(indInfo)
        } catch(error) {
            console.log(error)
        }
    }
    const checkIfWalletIsConnect = async () => {
        try{
            if(!window.klaytn) return alert('Please install Kaikas')
            if(window.klaytn.selectedAddress) {
                const accounts = await window.klaytn.enable()
                setCurrentAccount(accounts[0]);
            }
            else console.log("No accounts found")
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkIfWalletIsConnect();
        getIndInfo();
        getGenInfo();
      }, []);

      return (
        <Context.Provider
          value={{
            connectWallet,
           currentAccount,
           genInfo,
           indInfo,
          }}
        >
          {children}
        </Context.Provider>
      );
};
