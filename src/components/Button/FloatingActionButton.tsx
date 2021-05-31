import styled from "@emotion/styled";

import { Button } from "./Button";

type FloatingActionButtonProps = {
    size?: string;
    color?: string;
};
export const FloatingActionButton = styled(Button)<FloatingActionButtonProps>`
    z-index: 1000;
    border-radius: 50px;
    width: ${({ size }) => size ?? "3rem"};
    height: ${({ size }) => size ?? "3rem"};
    background-color: ${({ color }) => color ?? "var(--dark-gray)"};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
`;

export const FABContainer = styled.div`
    position: fixed;
`;

export const FABIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;
