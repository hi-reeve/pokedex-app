import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";
import { DialogContainer, DialogOverlay } from "./Dialog";

const SimpleDialogOverlay = styled(DialogOverlay)`
    background-color: hsla(0, 0%, 0%, 0.5);
`;
const SimpleDialogContainer = styled(DialogContainer)`
    background-color: white;
    padding: 2rem;
	overflow: auto;
    @media screen and (max-width: 525px) {
        width: 80vw;
    }
`;
const SimpleDialog: React.FC = ({ children }) => {
    const body = document.querySelector("body") as HTMLBodyElement;

    return (
        <>
            {createPortal(<SimpleDialogOverlay />, body)}
            {createPortal(
                <SimpleDialogContainer>{children}</SimpleDialogContainer>,
                body
            )}
        </>
    );
};

export default SimpleDialog;
