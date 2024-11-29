import { useState } from "react";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import money from "./assets/money.jpg";

function App() {
  const BackgroundImage = money;
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(from);
  
  //Holding all keys in a variable returned by useCurrencyInfo , after fetching info from the API
  
  const options = Object.keys(currencyInfo);
  // console.log(options);

  //Swap Currency options from to and from fields

  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  //set the converted amount by taking reference from the currencyInfo and to key

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    // Body Div
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            {/* FROM Input box */}
            <div className="w-full mb-1">
              <InputBox 
                label="From" 
                amount={amount}
                currencyOptions={options}
                onAmountChange = {(amount)=>setAmount(amount)}
                onCurrencyChange={(currency)=>setFrom(currency)}
                selectCurrency={from}
              />
            </div>

            {/* SWAP button */}
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 pt-0.5 pb-1"
                onClick={swap}
              >
                swap
              </button>
            </div>

            {/* TO Input box */}
            <div className="w-full mt-1 mb-4">
              <InputBox 
              label="To" 
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)=> setTo(currency)}
              selectCurrency={to} 
              amountDisabled={true}
              />
            </div>
            {/* CONVERTER button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
