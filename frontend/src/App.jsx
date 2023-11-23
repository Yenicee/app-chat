import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './chat';

const socket = io.connect("http://localhost:3001")

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
        }
  }

  return (
    <>
  <div className='chat'>
    <h2>Join the chat</h2>
    <input 
    type="text"
    placeholder='user...'
    onChange={(e) => setUsername(e.target.value)}
    />
<input
 type="text"
 placeholder='Id room:'
 onChange={(e) => setRoom(e.target.value)}
 />
 <button onClick={joinRoom}>Join chat</button>

 <Chat socket ={socket} username ={username} room = {room} />
  </div>
  
    </>
  )
}

export default App
