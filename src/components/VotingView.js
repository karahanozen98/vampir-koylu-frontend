import { Button } from "@mui/material";
import React from "react";
import socket from "../socket";

function VotingView({ user, users, days }) {
  const handleVote = (e, id) => {
    e.preventDefault();
    socket.emit("vote", { voterId: user.id, victimId: id });
  };
  return (
    <div>
      <h2>{days}</h2>
      <h3>İdam edilecek kişi için oy ver</h3>
      {users.length > 0 &&
        !user.isDead &&
        users
          .filter((x) => !x.isDead && x.id !== user.id)
          .map((player) => {
            return (
              <p className="withPadding spacearound" key={player.id}>
                <Button variant="contained" onClick={(event) => handleVote(event, player.id)}>
                  {player.name} ({player.role}) ({player.votes})
                </Button>
              </p>
            );
          })}
    </div>
  );
}
export default VotingView;
