import React from "react";

export default function getRandomNumbers(props) {
  const {
    randomNumbers,
    setRandomNumbers,
    loadingRandomNumbers,
    setLoadingRandomNumbers
  } = props;

  const requestBody = {
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
      apiKey: process.env.REACT_APP_API_KEY,
      n: "70",
      min: "1",
      max: "6"
    },
    id: "42"
  };
  // use axios
  // https://github.com/axios/axios
  fetch("https://api.random.org/json-rpc/4/invoke", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.result.random.data);
      setRandomNumbers(data.result.random.data);
      setLoadingRandomNumbers(false);
    })
    .catch(error => {
      console.error(error);
      setLoadingRandomNumbers(false);
    });

  return;
}
