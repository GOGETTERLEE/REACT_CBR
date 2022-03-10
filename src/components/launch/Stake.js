import React, {useContext, useState} from 'react'
import {Context} from "../../context/Context"
import { Link } from 'react-router-dom'
import './StakeStyle.css'
import Caver from 'caver-js';

// gen info : _realTimeRound, _realTimeTVL,  _realTimeIndex, _currentRate 
// ind info : _lastUpdateBalance, _realTimeIndRound, _realTimeBalance

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e)}
    className="input"
  />
);
const Stake = () => {
    const {myRealBalance, setStakeAmount, myBalance, approve, genInfo, indInfo, stakeAmount, onChangeStakeAmount, stake} = useContext(Context);
    const [menu, setMenu] = useState("stake");

  return (
      
    <div className="stake">
        <div className="roundbox">
            <div className="tvlbox">
                <ul className="tvll">
                    <li className="tvl1">TVL</li>
                    <li className="tvl2">{genInfo.realTimeTVL}</li>
                </ul>
                <div className="rateapybox">
                    <ul className="rate">
                    <li className="1">RATE</li>
                    <li className="2">{genInfo.currentRate}%</li>
                    </ul>
                    <ul className="apy">
                    <li className="1">APY</li>
                    <li className="2">{genInfo.currentAPY}%</li>
                    </ul>
                </div>
            </div>
            <div className="myround">
                <ul className="myroundl">
                    <li className="f">CURRENT ROUND</li>
                    <li className="s">{genInfo.realTimeRound}</li>
                </ul>

            </div>
        </div>
        <div className="info">
            <h1>TOTAL BALANCE</h1>
            <ul className="balancebox">
                <li className="balance">{indInfo.realTimeBalance}</li>
                <li className="percent">({((indInfo.realTimeBalance - indInfo.lastUpdateBalance)/indInfo.lastUpdateBalance*100).toFixed(4)}%)</li>
            </ul>
            <ul className="invested">
                <li className="1">MY ROUND</li>
                <li className="2">{indInfo.realTimeIndRound}</li>
            </ul>
            <ul className="invested">
                <li className="1">ANCD INVESTED</li>
                <li className="2">{indInfo.lastUpdateBalance}</li>
            </ul>
            <ul className="earned">
                <li className="1">ANCD EARNED</li>
                <li className="2">{(indInfo.realTimeBalance - indInfo.lastUpdateBalance).toFixed(4)}</li>
            </ul>
        </div>

        <div className="stakebox">
            <ul className="stakeoption">
                <li onClick={()=>setMenu("stake")} className={menu == "stake" &&'activebtn'}>STAKE</li>
                <li onClick={()=>setMenu("unstake")} className={menu == "unstake" &&'activebtn'}>UNSTAKE</li>
            </ul>
           
    
            <div className="stakesection">
                <ul className="spbt">
                    <li className="1">MY CBR:</li>
                    <li className="2">{myBalance}</li>
                </ul>
                {menu == "stake" ? (
                <>
                <div className="inputandall">
                    <Input className="input" placeholder="Amount (CBR)" value={stakeAmount} name="amount" type="number" handleChange={onChangeStakeAmount} />
                    <div className="allbtn" onClick ={()=>{setStakeAmount(myRealBalance)}}>ALL</div>  
                </div>
                <div className="btn-round" onClick ={()=>{stake()}}>STAKE</div>
                <div className="btn-round" onClick ={()=>{approve()}}>APPROVE</div></>):(<>
                    <div className="inputandall">
                    <Input className="input" placeholder="Amount (CBR)" value={stakeAmount} name="amount" type="number" handleChange={onChangeStakeAmount} />
                    <div className="allbtn" onClick ={()=>{setStakeAmount(myRealBalance)}}>ALL</div>  
                </div>
                <div className="btn-round" onClick ={()=>{stake()}}>UNSTAKE</div>

                 </>
                    
                )}
                
            </div>
            
            
        </div>
    </div>
  )
}
export default Stake