import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("UAH");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [rates, setRates] = React.useState({});
  React.useEffect(() => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((res) => res.json())
      .then((json) => {
        setRates(json);
        console.log(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Could not get rates from API");
      });
  }, []);
  const onChangeFromPrice
  return (
    <div className="App">
      <Block
        value={0}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
      />{" "}
      <Block value={0} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
