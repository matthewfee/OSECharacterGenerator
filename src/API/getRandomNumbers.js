import { RANDOM_NUMBERS_API_URL } from "../constants/constants";

export async function getRandomNumbers() {
  const axios = require("axios");
  let data = JSON.stringify({
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
      apiKey: "13182fb2-ebca-46d3-94e9-13e1f93fc79d",
      n: 50,
      min: 1,
      max: 6,
      replacement: true
    },
    id: 42
  });

  let config = {
    method: "post",
    url: RANDOM_NUMBERS_API_URL,
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data.result.random.data;
  } catch (error) {
    console.log(error);
  }

  return;
}
