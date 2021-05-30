import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
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
    animation: catching 1s ease-in-out 2;
`;
const CatchingDialogOverlay = styled(DialogOverlay)`
    background-color: hsla(0, 0%, 0%, 0.2);
`;
const CatchingDialogContainer = styled(DialogContainer)``;

type Props = {
    isReleasing?: boolean;
};

const pokeballPath = "/icon/pokeball.svg";
const pokeballOpenPath = "icon/open-pokeball.svg";
const CatchingDialog: React.FC<Props> = ({ isReleasing }) => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const [pokeballIcon, setPokebalIcon] = useState<string>(pokeballPath);
    useEffect(() => {
        if (!isReleasing) return;

        setTimeout(() => {
            setPokebalIcon(pokeballOpenPath);
        }, 2500);

        return () => {
            setPokebalIcon(pokeballPath);
        };
    }, [isReleasing]);
    return (
        <>
            {createPortal(<CatchingDialogOverlay />, body)}
            {createPortal(
                <CatchingDialogContainer>
                    <CatchingIcon src={pokeballIcon} alt="pokeball" />
                </CatchingDialogContainer>,
                body
            )}
        </>
    );
};

export default CatchingDialog;
