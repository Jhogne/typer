import axios from "axios";

export async function makeGetRequest(location) {
  let res = await axios.get("http://192.168.1.139:8080/" + location);
  let data = res.data;
  return data;
}

export function joinRoom(roomCode, userId, handleResponse, handleError) {
  const response = makeGetRequest(`joinRoom?id=${roomCode}&user=${userId}`);
  response.then(handleResponse).catch(handleError);
}

export function joinRoomDefaultName(roomCode, handleResponse, handleError) {
  const response = makeGetRequest(`joinRoom?id=${roomCode}`);
  response.then(handleResponse).catch(handleError);
}

export function createRoom(userId, handleResponse) {
  const response = makeGetRequest(`createRoom?user=${userId}`);
  response.then(handleResponse);
}

export function sendMessage(clientRef, location, msg) {
  if(typeof msg !== "string"){
    msg = JSON.stringify(msg)
  }
  try {
    clientRef.sendMessage(`/app/${location}`, msg);
    return true;
  } catch (e) {
    return false;
  }
}
