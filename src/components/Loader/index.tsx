import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";
const LoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    background: white;
`;

const LoaderImage = styled.img`
    @keyframes bounce {
        0% {
            transform: translateY(0px);
        }
        25% {
            transform: translateY(-10px);
        }
        50% {
            transform: translateY(0px);
        }
        75% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0);
        }
    }
    width: 150px;
    height: 150px;
    animation: bounce 1s ease-in-out infinite;
`;

const Loader = () => {
    const body = document.querySelector("body") as HTMLBodyElement;
    return createPortal(
        <LoaderContainer>
            <LoaderImage
                src="/icon/pokeball.svg"
                alt="loader"
                width="150px"
                height="150px"
            />
        </LoaderContainer>,
        body
    );
};

export default Loader;
