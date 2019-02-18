import React, { Component } from 'react'
import { Flex, Text, Box, Link } from 'rebass'

class Toolbar extends Component {
	render() {
		return (
			<Flex px={2} py={2} color='white' bg='black' alignItems='center'>
				<Text p={2} fontWeight='bold' fontSize='3' color='yellow'>
					What
				</Text>
				<Box mx='auto' />
				<Link
					href='#!'
					p={2}
					color='white'
					onClick={this.props.openModal}>
					Add
				</Link>
			</Flex>
		)
	}
}

export default Toolbar
