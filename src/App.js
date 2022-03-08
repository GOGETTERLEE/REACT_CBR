import './App.css';
import { useContext} from "react"
import { Context } from "./context/Context";

function App() {

    const { currentAccount, connectWallet, genInfo, indInfo, getGenInfo, getIndInfo} = useContext(Context);
 
    return (
    <div className="App">
      <div onClick={() => connectWallet()}>connect wallet</div>  
      <div onClick={() => connectWallet()}>{currentAccount}</div>
      <div> asd {indInfo} </div>
    </div>
  );
}

export default App;
