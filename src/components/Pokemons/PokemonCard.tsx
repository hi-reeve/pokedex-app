import { Pokemons } from "@/types/Pokemons";
import React, { Suspense, useContext, useState } from "react";

import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import { db, IPokemonDb } from "@/db";
import { useFormatPokemonId } from "@/hooks/useFormatter";
import { Button } from "../Button/Button";
import { releasePokemon } from "@/db/pokemon";
import Loader from "../Loader";
import { DialogButton } from "../dialog/Dialog";
import { ToastContext } from "@/context/ToastContext";
const CatchingDialog = React.lazy(
    () => import("@/components/dialog/CatchingDialog")
);
const DialogConfirmation = React.lazy(
    () => import("@/components/dialog/AfterCatchDialog")
);
const PokemonContainer = styled.div`
    background: white;
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: var(--rounded);
    height: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`;

const PokemonImage = styled.img`
    max-width: 50%;
    width: 100%;
    height: 100%;
    margin-left: auto;
`;

const PokemonName = styled.h2`
    font-weight: bold;
    font-size: 1.2rem;
`;
const PokemonNickname = styled.h4`
    font-size: 1rem;
    margin: 0.25rem 0;
`;

const PokemonInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;
const PokemonId = styled.h5`
    font-weight: bold;
    font-size: 0.8rem;
`;

const PokemonOwned = styled.p`
    font-size: 0.7rem;
    margin-top: 0.5rem;
`;

const ReleaseButton = styled(Button)`
    margin-top: 0.5rem;
    background-color: var(--nature-water);
    border-radius: var(--rounded);
    padding: 0.5rem 1rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const ReleaseButtonText = styled.span`
    color: white;
    margin-left: 0.25rem;
`;

const ReleaseIcon = styled.img`
    width: 20px;
    height: 20px;
`;

type Props = {
    pokemon: Pokemons | IPokemonDb;
    isMyPokemon?: boolean;
};
const PokemonCard: React.FC<Props> = ({ pokemon, isMyPokemon }) => {
    const ownedCount = (name: string) => {
        return useLiveQuery(() =>
            db.pokemon.where("name").equals(name).count()
        );
    };

    const toastContext = useContext(ToastContext);

    const [selectedPokemon, setSelectedPokemon] = useState(0);

    // open the confirmation dialog
    const handleDialogConfirm = (
        event: React.MouseEvent,
        pokemonId: number
    ) => {
        event.preventDefault();
        setDialogConfirmVisible(true);
        setSelectedPokemon(pokemonId);
    };

    // release the pokemon
    const handlePokemonRelease = () => {
        if (selectedPokemon === 0) return;

        setDialogConfirmVisible(false);
        setReleaseDialogVisible(true);
        const releaseTimeout = setTimeout(() => {
            releasePokemon(selectedPokemon);
            setReleaseDialogVisible(false);
            clearTimeout(releaseTimeout);
            toastContext.setMessageHandler("Pokemon has been released");
            toastContext.openToast();
            const toastTimeout = setTimeout(() => {
                toastContext.closeToast();
                clearTimeout(toastTimeout);
            }, 3000);
        }, 3000);
    };

    const [releaseDialogVisible, setReleaseDialogVisible] = useState(false);
    const [dialogConfirmVisible, setDialogConfirmVisible] = useState(false);

    const dialogConfirmContent = (
        <>
            <p>Are you sure want to release this pokemon?</p>
            <DialogButton
                onClick={e => {
                    e.preventDefault();
                    handlePokemonRelease();
                }}
                bgColor="var(--invalid-input)"
            >
                Release
            </DialogButton>
            <DialogButton
                onClick={e => {
                    e.preventDefault();
                    setDialogConfirmVisible(false);
                }}
                bgColor={`#d3d3d3`}
                style={{ marginLeft: "1rem" }}
            >
                Cancel
            </DialogButton>
        </>
    );
    return (
        <>
            <PokemonContainer>
                <PokemonInfoContainer>
                    <PokemonId>{useFormatPokemonId(pokemon.id)}</PokemonId>

                    {isMyPokemon && (
                        <PokemonNickname>
                            {(pokemon as IPokemonDb).nickname}
                        </PokemonNickname>
                    )}
                    <PokemonName>{pokemon.name}</PokemonName>
                    {!isMyPokemon && (
                        <PokemonOwned>
                            Owned : {ownedCount(pokemon.name)}
                        </PokemonOwned>
                    )}
                    {isMyPokemon && (
                        <ReleaseButton
                            onClick={e =>
                                handleDialogConfirm(
                                    e,
                                    (pokemon as IPokemonDb).dbid!
                                )
                            }
                        >
                            <ReleaseIcon
                                src="/icon/open-pokeball.svg"
                                alt={(pokemon as IPokemonDb).nickname}
                            />
                            <ReleaseButtonText>Release</ReleaseButtonText>
                        </ReleaseButton>
                    )}
                </PokemonInfoContainer>
                <PokemonImage
                    src={pokemon.image}
                    alt={pokemon.name}
                    loading="lazy"
                    width="100%"
                    height="100%"
                />
            </PokemonContainer>
            <Suspense fallback={<Loader />}>
                {releaseDialogVisible && <CatchingDialog isReleasing />}
                {dialogConfirmVisible && (
                    <DialogConfirmation>
                        {dialogConfirmContent}
                    </DialogConfirmation>
                )}
            </Suspense>
        </>
    );
};

export default PokemonCard;
