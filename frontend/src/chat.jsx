import React, { useState, useEffect } from "react";

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const sendMessage = async () => {
        try {
            if (username && currentMessage || selectedFile) {
                const info = {
                    message: currentMessage,
                    room,
                    author: username,
                    time: new Date(Date.now()).getHours() +
                        ":" +
                        new Date(Date.now()).getMinutes(),
                };

                // Agrega el archivo al objeto info si está seleccionado
                if (selectedFile) {
                    info.file = selectedFile;
                }

                // Emitir el evento "send_message" al servidor con la información del mensaje
                socket.emit("send_message", info);

                setCurrentMessage('');
                setSelectedFile(null);
            }
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    }

    return (
        <div>
            <h1>Chat</h1>

            <section className="chat-header">
                <p>Live Chat</p>
            </section>
            <section className="chat-messages">

            </section>
            <section className="chat-footer">
                <input
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="message..."
                    type="text"
                />
                <label htmlFor="file-input" className="custom-file-input-label">
                    <span>Attach Image</span>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </label>
                <button onClick={sendMessage}>Send...</button>
            </section>
        </div>
    )
}
export default Chat;
