import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Flex, Card } from 'rebass'
import { toMonth } from 'number-to-date-month-name'
import { withFirebase } from '../../hoc'

const Badge = props => (
	<Card
		color={props.selected ? 'white' : 'black'}
		bg={props.selected ? 'blue' : 'white'}
		{...props}
		px={3}
		py={1}
		borderRadius={9999}
		css={[
			{
				display: 'inline-block',
				'&:hover': {
					cursor: 'pointer'
				}
			},
			!props.selected
				? {
					'&:hover': {
						backgroundColor: 'lightgray'
					}
				  }
				: null
		]}
	/>
)

@observer
class Timeline extends Component {
	state = {
		years: [],
		months: []
	}

	_setStateFromObservable = stateKey => {
		return snap => this.setState({ [stateKey]: Object.keys(snap.val()) })
	}

	componentDidMount() {
		this.props.firebase
			.getYears()
			.on('value', this._setStateFromObservable('years'))
		this.props.firebase
			.getMonths()
			.on('value', this._setStateFromObservable('months'))
	}

	setYear(year) {
		this.props.firebase.setYear(year)
	}

	setMonth(month) {
		this.props.firebase.setMonth(month)
	}

	render() {
		return (
			<>
				<Flex alignItems='center' px={2} py={2}>
					{this.state.years.map(year => (
						<Badge
							key={year}
							selected={+year === +this.props.firebase.year}
							onClick={() => this.setYear(year)}>
							{year}
						</Badge>
					))}
				</Flex>
				<hr style={{ margin: 0 }} />
				<Flex alignItems='center' px={2} py={2}>
					{this.state.months.map(month => (
						<Badge
							key={month}
							selected={+month === +this.props.firebase.month}
							onClick={() => this.setMonth(month)}>
							{toMonth(month, 's')}
						</Badge>
					))}
				</Flex>
				<hr style={{ margin: 0 }} />
			</>
		)
	}
}

export default withFirebase(Timeline)
