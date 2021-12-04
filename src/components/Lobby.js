import React, { useState } from "react";
import socket from "../socket";
import { TextField, Button } from "@mui/material";

function Lobby({ user, users }) {
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    socket.emit("login", name);
  };

  const handleSetReady = (e) => {
    e.preventDefault();
    socket.emit("ready", user);
  };

  return (
    <div className="Lobby">
      <h1>Vampir Köylü</h1>
      <TextField
        disabled={!!user}
        placeholder="İsim"
        variant={"outlined"}
        onChange={(e) => setName(e.target.value)}
      >
        With a start adornment
      </TextField>
      {!user && (
        <Button variant="contained" onClick={handleLogin}>
          Lobiye Gir
        </Button>
      )}
      {users.length > 0 &&
        users.map((user) => {
          return (
            <p className="lobby-user spacearound" key={user.id}>
              <strong>{user.name}</strong>
              <span
                style={
                  user.state === true ? { color: "#4BB543" } : { color: "red" }
                }
              >
                {user.state ? "Hazır" : "Bekleniyor"}
              </span>
            </p>
          );
        })}
      {user && (
        <Button variant="contained" onClick={handleSetReady}>
          Hazır
        </Button>
      )}
    </div>
  );
}
export default Lobby;
