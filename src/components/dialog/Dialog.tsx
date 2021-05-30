import styled from "@emotion/styled";
import { Button } from "../Button/Button";

export const DialogOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
`;

export const DialogContainer = styled.div`
    border-radius: var(--rounded);
    max-height: 80vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10001;
`;

type DialogButtonProps = {
    bgColor?: string;
    color?: string;
};
export const DialogButton = styled(Button)<DialogButtonProps>`
    background-color: ${({ bgColor }) => bgColor ?? `var(--nature-water)`};
    color: ${({ color }) => color ?? `white`};
	padding: .5rem 2rem;
	border-radius: var(--rounded);
	margin-top: 2rem;
`;
