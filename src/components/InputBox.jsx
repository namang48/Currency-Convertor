import { useId } from "react";

function InputBox({
  label="Amount",
  amount=1,
  onAmountChange,
  onCurrencyChange,
  currencyOptions =[],
  selectCurrency="usd",
  amountDisabled=false,
  currencyDisabled=false,

  
  className = "",

  }) {

    const amountInputId = useId();
    
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label 
          className="text-black/40 mb-2 inline-block"
          htmlFor={amountInputId}
          >{label}</label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          value={amount}
          placeholder="Amount"
          disabled={amountDisabled}
          onChange={(event)=> {
            return onAmountChange && onAmountChange(Number(event.target.value))
          }
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select 
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(event)=>{
            return onCurrencyChange && onCurrencyChange(event.target.value)}}
          disabled = {currencyDisabled}
        >
          {
            currencyOptions.map((currency)=>{
            return <option 
              key={currency}
              value={currency}>{currency.toUpperCase()}
            </option>
            }
          
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
