import React, {useEffect, useState } from 'react';
import Caver from 'caver-js';
import { stakingContractABI, stakingContractAddress, tokenContractABI, tokenContractAddress } from "../constant/constant";
export const Context = React.createContext();


let caver;
if (typeof window.klaytn !== 'undefined') 
    caver = new Caver(window.klaytn); // caver 에 프로바이더를 박아야함, http로 박던지, 지갑에서 불러오던지 해야함.
else caver = new Caver('https://api.baobab.klaytn.net:8651/')

const createStakingContract = () => {
    const stakingContract = new caver.klay.Contract(stakingContractABI, stakingContractAddress)
    return stakingContract;
}
const createTokenContract = () => {
    const tokenContract = new caver.klay.Contract(tokenContractABI, tokenContractAddress)
    return tokenContract;
}


export const Provider = ({ children }) => {
    console.log("provider")
    const [currentAccount, setCurrentAccount] = useState("")
    const [genInfo, setGenInfo] = useState({})
    const [indInfo, setIndInfo] = useState({})
    const [myBalance, setMyBalance] = useState()
    const [stakeAmount, setStakeAmount] = useState()
    const [myRealBalance, setMyRealBalance] = useState()


    const onChangeStakeAmount = (e) => {
        setStakeAmount(e.target.value);
      };

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
            const [_realTimeRound, _realTimeTVL,  _realTimeIndex, _currentRate ] = await stakingContract.methods.getFrontGenInfo().call(); 
            const GenInfo = {currentRate : (_currentRate - 10000000000)/100000000 , currentAPY: (Math.pow((_currentRate/10000000000), 365) * 100).toFixed(4) , realTimeIndex : _realTimeIndex, realTimeRound : _realTimeRound, realTimeTVL : parseFloat(caver.utils.convertFromPeb(caver.utils.toBN(_realTimeTVL))).toFixed(4)};
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
            const IndInfo = {lastUpdateBalance : parseFloat(caver.utils.convertFromPeb(caver.utils.toBN(_lastUpdateBalance))).toFixed(4), realTimeIndRound : _realTimeIndRound, realTimeBalance : parseFloat(caver.utils.convertFromPeb(caver.utils.toBN(_realTimeBalance))).toFixed(4)};
            console.log()
            setIndInfo(IndInfo);

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
    const stake = async () => {
        try{
            if(!window.klaytn) return alert('Please install Kaikas')
            const stakingContract = createStakingContract();
            const stake = await stakingContract.methods.deposit(caver.utils.convertToPeb(String(stakeAmount), 'KLAY')).send({from:window.klaytn.selectedAddress, gas:'2000000'})
            getGenInfo();
            getIndInfo();
        } catch(error) {
            console.log(error)
        }
    }
    const getMyBalance = async () => {
        try{
            if(!window.klaytn) return alert('Please install Kaikas')
            const tokenContract = createTokenContract();
            const balance = await tokenContract.methods.balanceOf(window.klaytn.selectedAddress).call()
            setMyBalance(parseFloat(caver.utils.convertFromPeb(caver.utils.toBN(balance))).toFixed(4))
            setMyRealBalance(balance/1000000000000000000)
        } catch(error) {
            console.log(error)
        }
    }
    const approve = async () => {
        try{
            if(!window.klaytn) return alert('Please install Kaikas')
            const tokenContract = createTokenContract();
            
            const token = await tokenContract.methods.approve(stakingContractAddress, "1000000000000000000000000000000000000000").send({from:window.klaytn.selectedAddress, gas:'2000000'})
        
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkIfWalletIsConnect();
        getIndInfo();
        getGenInfo();
        getMyBalance();
      }, [currentAccount]);

      return (
        <Context.Provider
          value={{
            connectWallet,
           currentAccount,
           genInfo,
           indInfo,
           onChangeStakeAmount,
           stake,
           stakeAmount,
           approve,
           myBalance,
           setStakeAmount,
           myRealBalance,
          }}
        >
          {children}
        </Context.Provider>
      );
};
