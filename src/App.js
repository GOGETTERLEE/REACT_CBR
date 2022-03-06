import './App.css';
import { useContext } from "react"
import { Context } from "./context/Context";

function App() {
    const { currentAccount, connectWallet} = useContext(Context);
    return (
    <div className="App">
      <div onClick={() => connectWallet()}>CONNECT WALLET</div>
    </div>
  );
}

export default App;
