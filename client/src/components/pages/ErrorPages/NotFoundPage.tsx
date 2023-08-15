import React from "react";
import styled from "styled-components";
import gif from "assets/notFound.gif";

function NotFoundPage() {
	return (
		<Wrapper>
			<Text>
				404
				<br />
				Страница не найдена
			</Text>
			<Gif src={gif} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 20rem;
	overflow: hidden;
	background-color: white;
	/* background-image: url(${gif}); */
`;

const Text = styled.div`
	z-index: 10;
	font-size: 2rem;
	text-align: center;
`;

const Gif = styled.img`
	position: absolute;
	top: 0;
`;

export default NotFoundPage;
