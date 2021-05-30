import styled from "@emotion/styled";

import { Button } from "./Button";

type CircleButtonProps = {
    size?: string;
    color?: string;
};
export const FloatingActionButton = styled(Button)<CircleButtonProps>`
    z-index: 991;
    border-radius: 50px;
    width: ${({ size }) => size ?? "3rem"};
    height: ${({ size }) => size ?? "3rem"};
    background-color: ${({ color }) => color ?? "var(--dark-gray)"};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
`;
