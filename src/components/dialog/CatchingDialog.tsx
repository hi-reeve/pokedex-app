import styled from "@emotion/styled";
import React from "react";
import { DialogContainer, DialogOverlay } from "./Dialog";
import { createPortal } from "react-dom";
const CatchingIcon = styled.img`
    width: 150px;
    height: 150px;
    @keyframes catching {
        0% {
            transform: rotate(0);
        }
        10% {
            transform: rotate(-15deg);
        }
        20% {
            transform: rotate(15deg);
        }
        30% {
            transform: rotate(-15deg);
        }
        50% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(0);
        }
    }
    animation: catching 1s ease-in-out 3;
`;
const CatchingDialogOverlay = styled(DialogOverlay)`
    background-color: hsla(0, 0%, 0%, 0.2);
`;
const CatchingDialogContainer = styled(DialogContainer)``;

const CatchingDialog: React.FC = () => {
    const body = document.querySelector("body") as HTMLBodyElement;

    return (
        <>
            {createPortal(<CatchingDialogOverlay />, body)}
            {createPortal(
                <CatchingDialogContainer>
                    <CatchingIcon src="/icon/pokeball.svg" />
                </CatchingDialogContainer>,
                body
            )}
        </>
    );
};

export default CatchingDialog;
