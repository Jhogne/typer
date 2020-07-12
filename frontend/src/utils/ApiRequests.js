import axios from "axios";

export async function makeGetRequest(location) {
  let res = await axios.get("http://192.168.1.139:8080/" + location);
  let data = res.data;
  return data;
}

export function joinRoom(roomCode, playerId, handleResponse, handleError) {
  const response = makeGetRequest(`joinRoom?id=${roomCode}&user=${playerId}`);
  response.then(handleResponse).catch(handleError);
}

export function joinRoomDefaultName(roomCode, handleResponse, handleError) {
  const response = makeGetRequest(`joinRoom?id=${roomCode}`);
  response.then(handleResponse).catch(handleError);
}

export function createRoom(playerId, handleResponse) {
  const response = makeGetRequest(`createRoom?user=${playerId}`);
  response.then(handleResponse);
}

function sendMessage(clientRef, location, msg) {
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg);
  }
  try {
    clientRef.sendMessage(`/app/${location}`, msg);
    return true;
  } catch (e) {
    return false;
  }
}

export function finishGame(clientRef, roomId, playerId) {
  sendMessage(clientRef, `/room/${roomId}/finish`, playerId);
}

export function updatePlayer(clientRef, roomId, player) {
  sendMessage(clientRef, `/room/${roomId}/postState`, player);
}

export function resetMessage(clientRef, roomId, player) {
  sendMessage(clientRef, `/room/${roomId}/postState`, player);
}

export function leaveMessage(clientRef, roomId, playerId) {
  sendMessage(clientRef, `room/${roomId}/leave`, playerId);
}

export function updateRoomMessage(clientRef, roomId) {
  sendMessage(clientRef, `/room/${roomId}/update`, "Hello");
}
