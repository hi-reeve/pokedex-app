import styled from "@emotion/styled";
import { Button } from "./Button";

type ReleaseButtonProps = {
    bgColor?: string;
};
export const ReleaseButton = styled(Button)<ReleaseButtonProps>`
    margin-top: 0.5rem;
    background-color: ${({ bgColor }) => `var(--nature-${bgColor ?? "water-light"})`};

    border-radius: var(--rounded);
    padding: 0.5rem 1rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const ReleaseButtonText = styled.span`
    margin-left: 0.25rem;
`;

export const ReleaseIcon = styled.img`
    width: 20px;
    height: 20px;
`;
