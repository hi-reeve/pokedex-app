import styled from "@emotion/styled";
import React from "react";

const LoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
	display: grid;
	place-items: center;
`;

const LoaderImage = styled.img`
	
`
const Loader = () => {
    return (
        <LoaderContainer>
            <LoaderImage />
        </LoaderContainer>
    );
};

export default Loader;
