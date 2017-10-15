import socketio from 'socket.io-client'
// Socket.IOでWebSocketサーバに接続する
export default socketio.connect('http://localhost:3001');
