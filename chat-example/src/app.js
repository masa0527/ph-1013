import React from 'react';
import ChatForm from './form';
import socket from './socket';

// チャットアプリのメインコンポーネント定義
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
  }

  // コンポーネントがマウントされたとき
  componentDidMount() {
    // リアルタイムにログを受信するように設定
    socket.on('chat-msg', (obj) => {
      const logs = this.state.logs;
      // keyを設定
      obj.key = 'key_' + (this.state.logs.length + 1);
      console.log(obj);
      // 既存ログに追加
      logs.unshift(obj);
      this.setState({logs: logs});
    })
  }

  render() {
    // ログ一つずつの描画内容を生成
    const messages = this.state.logs.map(log => (
      <div className="tile" key={log.key}>
        <div className="tile-icon">
          <i className="icon icon-3x icon-people"></i>
        </div>
        <div className="tile-content">
          <p className="tile-title text-primary">{log.name}</p>
          <p className="tile-subtitle">{log.message}</p>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            <h1>リアルタイムチャット</h1>
          </div>
          <ChatForm/>
          <div className="column col-12">
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title h6">
                  コメント
                </div>
              </div>
              <div className="panel-body">
                {messages}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;
