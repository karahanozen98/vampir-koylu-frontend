import { Button } from "@mui/material";
import React from "react";
import socket from "../socket";

export function VillagerReady({ user }) {
  console.log(user);
  const handleReady = (e) => {
    e.preventDefault();
    socket.emit("villagerReadyForNight", user.id);
  };
  return (
    <div>
      {!user.isDead && (
        <div>
          <Button variant="contained" onClick={handleReady}>
            Uyu 💤💤💤
          </Button>
        </div>
      )}
    </div>
  );
}

export function DoctorReady({ user, users }) {
  console.log(user, users);
  const handleProtect = (e, id) => {
    e.preventDefault();
    socket.emit("docReadyForNight", { doctorId: user.id, userId: id });
  };
  return (
    <div>
      <h3>Bu gece birini korulmalısın</h3>
      {users
        .filter((x) => x.id !== user.id && !x.isDead)
        .map((user) => {
          return (
            <p className="withMargin spacearound" key={user.id}>
              <strong>{user.name}</strong>
              <Button
                variant="outlined"
                onClick={(e) => handleProtect(e, user.id)}
              >
                {"Seç"}
                {user.isProtected ? " 🛡" : ""}
              </Button>
            </p>
          );
        })}
    </div>
  );
}

export function VampireReady({ user, users }) {
  console.log(user, users);
  const handleProtect = (e, id) => {
    e.preventDefault();
    socket.emit("vampireReadyForNight", { vampireId: user.id, userId: id });
  };
  return (
    <div>
      <h3>Bu gece birini öldürmelisin</h3>
      {users
        .filter((x) => x.id !== user.id && !x.isDead)
        .map((user) => {
          return (
            <p key={user.id}>
              <strong>{user.name}</strong>
              <Button onClick={(e) => handleProtect(e, user.id)}>
                {"Seç"}
                {user.isTheVictim ? " 🔪🩸" : ""}
              </Button>
            </p>
          );
        })}
    </div>
  );
}
