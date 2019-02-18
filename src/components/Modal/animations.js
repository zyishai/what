import styled, { keyframes } from 'styled-components'

export const fromAbove = keyframes`
	0% {
		top: -50%;
		transform: translate(-50%, -50%);
	}
	80% {
		top: 50%;
		transform: translate(-50%, -80%);
	}
	100% {
		top: 50%;
		transform: translate(-50%, -100%);
	}
`

export const showOverlay = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`
