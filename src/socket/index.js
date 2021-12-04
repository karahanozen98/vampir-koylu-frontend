import io from "socket.io-client";
import backendUrl from "../config";

const socket = io(backendUrl);

export default socket;
