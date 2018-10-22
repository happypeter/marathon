import React from 'react'
import { Router } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

injectGlobal`
  #root {
    min-width: 100%;
    min-height: 100%;
    display: flex;
  }
`

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export default hot(module)(App)
