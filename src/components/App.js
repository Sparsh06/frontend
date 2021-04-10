import React, { Component } from 'react';
import {RepoDetails} from './';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      repo: '',
      showDetails: false
    };
  }

  handleOnChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleSubmit = () => {
    let username = this.state.username;
    
    if(username === ''){
      alert("Please enter your user name...");
      return;
    }


    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          repo: data,
          showDetails: true,
          username: ''
        })
      );
  };

  render() {
    const { showDetails, repo, username } = this.state;
    return (
      <div>
        <div className='navbar'>
          <h2>Github user</h2>
        </div>
        
        <div className='input__box'>
          <input
            type='text'
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder='Enter your user name...'
          />
          <button className="btn" onClick={this.handleSubmit}>Submit</button>
        </div>

        {showDetails ? <RepoDetails data={repo} username={username} /> : null}
      </div>
    );
  }
}

export default App;
