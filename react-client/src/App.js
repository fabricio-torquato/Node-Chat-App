import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {name: '',room:''};

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  
  handleChangeRoom(event) {
    this.setState({room: event.target.value});
  }

  render() {
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form>
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
            <div className="form-field">
              <label >Display Name
              <input type="text" autoFocus value={this.state.name} onChange={this.handleChangeName} />
              </label>            
            </div>
            <div className="form-field">
              <label >Room name
              <input type="text" value={this.state.room} onChange={this.handleChangeRoom} />
              </label>              
            </div>
            <div className="form-field">
              <Link to={`/chat/${this.state.name}/${this.state.room}`}>
                <button type="submit">Enter Chat</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
