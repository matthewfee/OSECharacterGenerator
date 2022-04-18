import { RANDOM_NUMBERS_API_URL } from "../constants/constants";

export async function getRandomNumbers() {
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
  const response = await fetch(RANDOM_NUMBERS_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  return data.result.random.data;

  // .then(res => res.json())
  // .then(data => {
  //   return data.result.random.data;
  // })
  // .catch(error => {
  //   return console.error(error);
  // });

  return;
}
