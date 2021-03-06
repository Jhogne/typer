import React from "react";
import { Player } from "components/";

function getOpponents(players, me) {
  const bars = players
    .filter((player) => {
      return player.id !== me;
    })
    .map((player) => {
      return (
        <Player
          key={player.id}
          id={player.id}
          color="secondary"
          progress={player.progress}
          wpm={player.wpm}
          ready={player.ready}
        />
      );
    });
  return bars;
}

export default function Standings(props) {
  const me = props.players.find((player) => player.id === props.myId);
  return (
    <div className={props.style}>
      {me !== undefined && (
        <Player
          id={me.id}
          color="primary"
          progress={me.progress}
          wpm={me.wpm}
          ready={me.ready}
        />
      )}
      {getOpponents(props.players, props.myId)}
    </div>
  );
}
