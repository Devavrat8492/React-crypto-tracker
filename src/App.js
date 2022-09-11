import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord , setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
        // console.log(response.data);
      }
    );
    // console.log("It worked!");
  }, []);

  const filterdCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLocaleLowerCase());
  });


  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="Search Coins" onChange={
          (event) => {setSearchWord(event.target.value)}
        }
        />
      </div>
      <div className="crytoDisplay">
        {filterdCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
