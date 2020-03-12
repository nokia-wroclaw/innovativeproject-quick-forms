import React from 'react';
import axios from 'axios';
import UserForms from './components/UserForms';
import SignIn from './components/SignIn';

const apiUrl = '/api';

class App extends React.Component {
  componentDidMount() {
    this.getForms();
  }

  async getForms() {
    await axios.get(`${apiUrl}/forms`);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SignIn />
          
          <UserForms/>
        </header>
      </div>
    );
  }
}

export default App;
