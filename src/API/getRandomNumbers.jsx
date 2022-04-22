import { RANDOM_NUMBERS_API_URL } from "../constants/constants";
import axios from "axios"

export async function getRandomNumbers() {

  let data = JSON.stringify({
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
      apiKey: import.meta.env.VITE_APP_API_KEY,
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
