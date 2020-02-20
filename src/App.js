import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { setData } from './dux/reducer'
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sessionData: {}
    }

    this.createSession = this.createSession.bind(this)
    this.destroySession = this.destroySession.bind(this)
    this.putInRedux = this.putInRedux.bind(this)
  }
  componentDidMount() {
    axios.get('/auth/get_session').then(session => {
      this.setState({
        sessionData: session.data
      })
    })
  }

  createSession() {
    axios.post('/auth/set_data_in_session', {
      date: new Date(),
      destination: 'server',
      coding: 'is Fun?'
    }).then(session => {
      this.setState({
        sessionData: session.data
      })
    })
  }

  destroySession() {
    axios.post('/auth/destroy_data_in_session').then(session => {
      this.setState({
        sessionData: session.data
      })
    })
  }

  putInRedux() {
    this.props.setData(this.state.sessionData)
  }
  render() {
    const { sessionData } = this.state;
    const { reduxData } = this.props;
    console.log(sessionData);
    return (
      <div className="App">
        <main>
          <div>
            <h1>REDUX</h1>
            <pre>{reduxData ? JSON.stringify(reduxData, undefined, 4) : 'No redux data'}</pre>
          </div>
          <div>
            <h1>SESSION</h1>
            <pre>{sessionData ? JSON.stringify(sessionData, undefined, 4): 'No session data'}</pre>
          </div>
        </main>
        <button onClick={this.createSession}>Create Session</button>
        <button onClick={this.destroySession}>Destroy Session</button>
        <button onClick={this.putInRedux}>Put in Redux</button>

        <a href='/'>refresh</a>
      </div>
    );
  }
}

const mapStateToProps = state => { return {reduxData: state} }

export default connect(mapStateToProps, {setData})(App);
