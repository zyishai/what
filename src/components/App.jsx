import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Flex } from 'rebass'

import { withFirebase } from '../hoc'

import { Toolbar } from './Toolbar'
import { Timeline } from './Timeline'
import { List } from './List'
import { Modal } from './Modal'

@observer
class App extends Component {
	state = {
		showModal: false
	}

	openModal = () => {
		this.setState({ showModal: true })
	}

	closeModal = () => {
		this.setState({ showModal: false })
	}

	render() {
		return (
			<React.Fragment>
				{this.state.showModal && <Modal close={this.closeModal} />}
				<Toolbar openModal={this.openModal} />
				<Timeline />
				<Flex>
					<List
						title='Articles'
						items={this.props.firebase.articles}
					/>
					<List title='Books' items={this.props.firebase.books} />
					<List title='Videos' items={this.props.firebase.videos} />
				</Flex>
			</React.Fragment>
		)
	}
}

export default withFirebase(App)
