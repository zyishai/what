import React, { Component } from 'react'
import DevTools from 'mobx-react-devtools'

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<h1>Welcome to React-Mobx!</h1>
				<DevTools />
			</React.Fragment>
		)
	}
}

export default App
