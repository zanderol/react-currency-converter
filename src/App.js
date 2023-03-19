import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("UAH");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  const [rates, setRates] = React.useState({});

  // React.useEffect(() => {
  //   fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setRates(json);
  //       console.log(json);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //       alert("Could not get rates from API");
  //     });
  // }, []);

  React.useEffect(() => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((res) => res.json())
      .then((json) => {
        setRates(
          json.reduce((obj, item) => ({ ...obj, [item.cc]: item.rate }), {})
        );

        // console.log(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Could not get rates from API");
      });
  }, []);

  // const onChangeFromPrice = (value) => {
  //   const price = value / rates[fromCurrency];
  //   const result = price * rates[toCurrency];
  //   setFromPrice(value);
  //   setToPrice(result);
  // };

  const onChangeFromPrice = (value) => {
    const rateFrom = rates[toCurrency] || 1;
    const rateTo = rates[fromCurrency] || 1;
    const price = value / rateFrom;
    const result = price * rateTo;
    setFromPrice(value);
    setToPrice(isNaN(result) ? 0 : result);
  };

  // const onChangeToPrice = (value) => {
  //   setToPrice(value);
  // };

  const onChangeToPrice = (value) => {
    const rateFrom = rates[toCurrency] || 1;
    const rateTo = rates[fromCurrency] || 1;
    const price = value / rateTo;
    const result = price * rateFrom;
    setFromPrice(isNaN(result) ? 0 : result);
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
