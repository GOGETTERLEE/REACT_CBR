import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import './LaunchNavStyle.css'
import {Context} from '../../context/Context'


const LaunchNav = () => {
  const [menu, setMenu] = React.useState("stake")
  const {connectWallet, currentAccount} = React.useContext(Context)
  const [userName, setUserName] = React.useState()


  useEffect(() => {
    if (currentAccount) {
          setUserName(
            `${currentAccount.slice(0, 7)}...${currentAccount.slice(38)}`,
          )
  }}, [currentAccount])
  
  return (
    <div>
    <div className='navbar'>
      <Link to='/'><h1>ANCD</h1></Link>
      
      {currentAccount ? (<div className="btnnav">{userName}</div>) : (<div className="btnnav" onClick={() => connectWallet()}>CONNECT WALLET</div>)}
    </div>
      
    <div>
      <ul className='selection'>
            <li className={menu == "stake" &&'activebtn'}>
              <Link to='/Launch/Stake' onClick={() => setMenu("stake")}>STAKE</Link>
            </li>
            <li className={menu == "bond" &&'activebtn'}>
              <Link to='/Launch/Bond' onClick={() => setMenu("bond")}>BOND</Link>
            </li>
            <li className={menu == "borrow" &&'activebtn'}>
              <Link to='/Launch/Borrow' onClick={() => setMenu("borrow")}>BORROW</Link>
            </li>
            <li className={menu == "deposit" &&'activebtn'}>
              <Link to='/Launch/Deposit' onClick={() => setMenu("deposit")}>DEPOSIT</Link>
            </li>
          </ul>
    </div>
    </div>
  )
}

export default LaunchNav