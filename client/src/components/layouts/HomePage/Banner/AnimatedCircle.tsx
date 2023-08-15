import React from "react";
import {
	CircleContainer,
	CircleOne,
	CircleThree,
	CircleTwo,
	CircleWrapper,
	CircleZero,
} from "./components";

function AnimatedCircle() {
	return (
		<CircleContainer>
			<CircleWrapper>
				<CircleZero />
				<CircleOne />
				<CircleTwo />
				<CircleThree />
			</CircleWrapper>
		</CircleContainer>
	);
}

export default AnimatedCircle;
