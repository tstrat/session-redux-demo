import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import {
  setData,
  createSession,
  destroySession,
  getSession,
} from './dux/reducer'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sessionData: {},
    }
    this.showServerSession = this.showServerSession.bind(this)
    this.createNewSession = this.createNewSession.bind(this)
    this.removeSession = this.removeSession.bind(this)
    this.putInRedux = this.putInRedux.bind(this)
  }
  componentDidMount() {
    // not typical for production, usually it is going into redux not directly in state
    this.showServerSession()
    /* swap with below to see it working with thunk */
    this.props.getSession()
  }

  async showServerSession() {
    axios.get('/auth/me').then((session) => {
      this.setState({
        sessionData: session.data,
      })
    })
  }
  async createNewSession() {
    await this.props.createSession({
      name: 'eevee',
      id: 133,
      type: 'normal',
    })
    this.showServerSession()
  }

  async removeSession() {
    await this.props.destroySession()
    this.showServerSession()
  }

  putInRedux(info) {
    this.props.setSession(info)
  }
  render() {
    const { sessionData } = this.state
    const { reduxData } = this.props
    return (
      <div className='App'>
        <main>
          <div>
            <h1>REDUX</h1>
            <pre>
              {reduxData
                ? JSON.stringify(reduxData, undefined, 4)
                : 'No redux data'}
            </pre>
          </div>
          <div>
            <h1>SESSION</h1>
            <pre>
              {sessionData
                ? JSON.stringify(sessionData, undefined, 4)
                : 'No session data'}
            </pre>
          </div>
        </main>
        <button
          onClick={() =>
            this.putInRedux({ name: 'eevee', id: 133, type: 'normal' })
          }
        >
          Put some values in Redux
        </button>
        <button onClick={this.createNewSession}>Create Session</button>
        <button onClick={this.removeSession}>Destroy Session</button>
        <button onClick={() => this.putInRedux(this.state.sessionData || {})}>
          Put Session In Redux
        </button>
        <a href='/'>refresh</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { reduxData: state }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSession: () => dispatch(getSession()),
    createSession: (info) => dispatch(createSession(info)),
    destroySession: () => dispatch(destroySession()),
    setSession: (data) => dispatch(setData(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
