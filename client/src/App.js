import React, { Component } from 'react'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="title">0hh1</h1>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </div>
      </Router>
    )
  }
}

export default App
