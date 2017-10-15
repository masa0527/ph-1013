import React from 'react';
import socket from './socket';

// 書き込みフォームのコンポーネント
class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', message: ''}
  }

  nameChanged(e) {
    this.setState({name: e.target.value})
  }

  messageChanged(e) {
    this.setState({message: e.target.value})
  }

  // サーバに名前とメッセージを送信
  send() {
    socket.emit('chat-msg', {
      name: this.state.name,
      message: this.state.message
    });
    this.setState({message: ''}) // フィールドをクリア
  }

  render() {
    return (
      <div className="column col-12">
        <div className='form-group'>
          <label className="form-label">名前</label>
          <input className="form-input" value={this.state.name}
                 onChange={e => this.nameChanged(e)}/>
        </div>
        <div className='form-group'>
          <label className="form-label">メッセージ</label>
          <input className="form-input" value={this.state.message}
                 onChange={e => this.messageChanged(e)}/>
        </div>
        <button className='btn' onClick={e => this.send()}>送信</button>
      </div>
    );
  }
}

export default ChatForm;
