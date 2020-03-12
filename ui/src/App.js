import React from 'react';
import axios from 'axios';
import './App.css';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import SignIn from './components/SignIn';

const apiUrl = '';




class App extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.loadUsers();
  }

  async createUser() {
    await axios.get(`${apiUrl}/user-create`);
    this.loadUsers();
  }

  async loadUsers() {
    const res = await axios.get(`${apiUrl}/users`);
    this.setState({
      users: res.data,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <Button variant="contained" color="primary">
            Hello World
          </Button>

          <SignIn />

          <button type="button" onClick={() => this.createUser()}>
            Create User
          </button>
          <p>Users list:</p>
          <ul>
            {this.state.users.map((user) => (
              <li key={user._id}>
                id:
                {user._id}
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
