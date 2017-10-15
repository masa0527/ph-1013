// HTTPサーバを作成
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const portNo = 3001;
const socketio = require('socket.io');
server.listen(portNo, () => {
  console.log('起動しました', 'http://localhost:' + portNo)
});
// publicディレクトリのファイルを自動で返す
app.use('/public', express.static('./public'));
app.get('/', (req, res) => { // ルートへのアクセスを/publicへ
  res.redirect(302, '/public')
});

// WebSocketサーバを起動
const io = socketio.listen(server);
// クライアントが接続したときのイベントを設定
io.on('connection', (socket) => {
  console.log('ユーザが接続:', socket.client.id);
  // メッセージ受信時の処理を記述
  socket.on('chat-msg', (msg) => {
    console.log('メッセージ', msg);
    // 全てのクライアントに送信
    io.emit('chat-msg', msg)
  })
});
