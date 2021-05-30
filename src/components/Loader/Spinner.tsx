import styled from "@emotion/styled";
import React from "react";
type SpinnerProps = {
    size?: string;
    color?: string;
};

export const SpinnerContainer = styled.div`
    width: 100vw;
    min-height: 50vh;
    display: grid;
    place-items: center;
`;
export const SpinnerBar = styled.div<SpinnerProps>`
    @keyframes spinner {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    width: ${({ size }) => size ?? "4rem"};
    height: ${({ size }) => size ?? "4rem"};
    border: 4px solid ${({ color }) => color ?? `var(--dark-gray)`};
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
`;

const Spinner: React.FC<SpinnerProps> = ({ color, size }) => {
    return (
        <SpinnerContainer>
            <SpinnerBar color={color} size={size} />
        </SpinnerContainer>
    );
};

export default Spinner;
