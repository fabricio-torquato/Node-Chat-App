import React, { Component } from "react";
import "./App.css";
import openSocket from "socket.io-client";
import moment from "moment";

const ListItem = ({ value }) => <li>{value}</li>;

const List = ({ items }) => (
  <ol>
    {items.map((item, i) => (
      <ListItem key={i} value={item} />
    ))}
  </ol>
);


const Posts = ({ items }) => (
  <ol className="chat__messages">
    {items.map((item, i) => (
      <li key={i} className="message">
        <div className="message__title">
          <h4>{item.from}</h4>
          <span>{item.createdAt}</span>
        </div>
        <div className="message__body">
          <p>{item.text}</p>
        </div>
      </li>
    ))}
  </ol>
);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], posts: [], text: "" };
    this.socket = null;
    this.handleChangeUsers = this.handleChangeUsers.bind(this);
    this.handleChangeMessages = this.handleChangeMessages.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    this.socket = openSocket("http://localhost:4000");
    const socket = this.socket;
    this.socket.on("connect", () => {
      console.log("Connected to server");
      var params = { name: this.props.name, room: this.props.room };

      socket.emit("join", params, err => {
        if (err) {
          alert(err);
          window.location.href = "/";
        } else {
          console.log("No Error");
        }
      });
    });

    this.socket.on("updateUserList", users => {
      this.handleChangeUsers(users);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnect to server");
    });

    this.socket.on("newMessage", message => {
      var formattedTime = moment(message.createdAt).format("h:mm a");
      var msg = {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      };
      this.handleChangeMessages(msg);
    });
  }

  sendMessage(event) {
    const mainChat = this;
    this.socket.emit(
      "createMessage",
      {
        from: "User",
        text: mainChat.state.text
      },
      err => {
        if (err) {
          alert(err);
        }
      }
    );
    this.setState({ text: '' });
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value });
  }

  handleChangeUsers(values) {
    this.setState({ users: values });
  }

  handleChangeMessages(value) {
    this.setState({ posts: [...this.state.posts, value] });
  }

  render() {
    return (
      <div className="chat">
        <div className="chat__sidebar">
          <h3>People</h3>
          <div id="users" />
          <List items={this.state.users} />
        </div>

        <div className="chat__main">
          <Posts items={this.state.posts} className="chat__messages" />
          <div className="chat__footer">
            <input
              type="text"
              placeholder="Message"
              autoFocus
              autoComplete="off"
              value={this.state.text}
              onChange={this.handleChangeText}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.sendMessage()
                }
              }}
            />
            <button onClick={this.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
