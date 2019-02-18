import React from 'react'
import { Heading, Flex, Text } from 'rebass'

export default function List(props) {
	return (
		<Flex flexDirection='column'>
			<Heading px={4} pt={3} pb={1}>
				{props.title}
			</Heading>
			<Flex flexDirection='column' px={4}>
				{props.items &&
					props.items.map((item, idx) => (
						<Text key={item.date + idx} py={1}>
							{idx + 1}. {item.title}
						</Text>
					))}
			</Flex>
			<Text
				mt={2}
				mx={4}
				p={1}
				fontWeight='bold'
				fontSize={3}
				bg='lightblue'
				css={{ display: 'inline-block', borderRadius: '5px' }}>
				Total: {(props.items && props.items.length) || 0}
			</Text>
		</Flex>
	)
}
