import axios from "axios";

export async function makeGetRequest(location) {
  let res = await axios.get("http://192.168.1.136:8080/" + location);
  let data = res.data;
  return data;
}

export function joinRoom(roomCode, handleResponse) {
  const response = makeGetRequest(`joinRoom?id=${roomCode}`);
  response.then(handleResponse);
}

export function createRoom(handleResponse) {
  const response = makeGetRequest("createRoom");
  response.then(handleResponse);
}

export function sendMessage(clientRef, location, msg) {
  try {
    clientRef.sendMessage(`/app/${location}`, JSON.stringify(msg));
    return true;
  } catch (e) {
    return false;
  }
}
