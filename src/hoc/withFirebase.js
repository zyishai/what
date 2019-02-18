import React from 'react'
import { FirebaseContext } from '../stores/firebase'

export default Component => props => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
)
