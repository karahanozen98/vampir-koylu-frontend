import "./App.css";
import { useEffect, useRef, useState } from "react";
import socket from "./socket";
import Lobby from "./components/Lobby";
import VotingView from "./components/VotingView";
import NightView from "./components/NightView";
import { Alert } from "@mui/material";

function App() {
  const [error, setError] = useState(null);
  const [user, _setUser] = useState(null);
  const [users, _setUsers] = useState([]);
  const [days, setDays] = useState(false);
  const [night, setNight] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const userRef = useRef(user);

  const setUser = (value) => {
    userRef.current = value;
    _setUser(value);
  };
  const setUsers = (users) => {
    _setUsers(users);
    const currentUser = users.filter((x) => x.id === userRef?.current?.id)[0];
    console.log(currentUser);
    if (currentUser) setUser(currentUser);
  };

  useEffect(() => {
    socket.on("loggedIn", (user) => {
      if (user) setUser(user);
    });

    socket.on("updateUsers", (users) => {
      if (users) {
        setUsers(users);
      }
    });

    socket.on("gameBegin", ({ msg, users }) => {
      setDays(msg);
      setNight(false);
      setUsers(users);
    });

    socket.on("nightBegin", ({ msg, users }) => {
      console.log(msg, users);
      setUsers(users);
      setDays(false);
      setNight(msg);
    });

    socket.on("gameOver", ({ msg, vampire }) => {
      setGameOver({ msg, vampire });
    });

    socket.on("error", (msg) => {
      setError(msg);
    });

    return () => {
      console.log("Unmount");
      socket.disconnect();
    };
  }, []);

  if (!gameOver && user && user.isDead) {
    return (
      <div className="App">
        <div>
          <h1>Öldürüldün! Oyunun sonuna kadar katılamazsın</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {!gameOver && (
        <div>
          {!days && !night && <Lobby user={user} users={users} />}
          {days && <VotingView user={user} users={users} days={days} />}
          {night && <NightView night={night} user={user} users={users} />}
        </div>
      )}
      {gameOver && (
        <div>
          <h1>Oyun bitti</h1>
          <h2>{gameOver.msg}</h2>
          <h2>Vampir: {gameOver?.vampire?.name ?? ""}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
