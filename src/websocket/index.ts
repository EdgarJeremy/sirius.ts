import socketio from 'socket.io';
import rootHandler from './handlers/root';

const websocket = (io: socketio.Server) => {
    io.on('connect', rootHandler);
};

export default websocket;