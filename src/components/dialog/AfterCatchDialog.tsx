import styled from "@emotion/styled";
import React from "react";
import { createPortal } from "react-dom";
import { DialogContainer, DialogOverlay } from "./Dialog";

const AfterCatchDialogOverlay = styled(DialogOverlay)`
    background-color: hsla(0, 0%, 0%, 0.5);
`;

const AfterCatchDialogContainer = styled(DialogContainer)`
    background-color: white;
    padding: 2rem;
	@media screen and (max-width : 525px){
		width: 80vw;
	}
`;
const AfterCatchDialog: React.FC = ({ children }) => {
    const body = document.querySelector("body") as HTMLBodyElement;

    return (
        <>
            {createPortal(<AfterCatchDialogOverlay />, body)}
            {createPortal(
                <AfterCatchDialogContainer>
                    {children}
                </AfterCatchDialogContainer>,
                body
            )}
        </>
    );
};

export default AfterCatchDialog;
