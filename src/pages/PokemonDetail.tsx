import React, { Suspense, useEffect, useState } from "react";
import { getPokemonByName } from "@/graphql/queries/getPokemonByName";
import { Pokemon } from "@/types/Pokemons";

import { useParams } from "react-router";
import { Tab, Tabs } from "@/components/ui/Tab/Tab";

import Loader from "@/components/Loader";
import styled from "@emotion/styled";
import { FloatingActionButton } from "@/components/Button/FloatingActionButton";

import { createPortal } from "react-dom";
import CatchingDialog from "@/components/dialog/CatchingDialog";
import AfterCatchDialog from "@/components/dialog/AfterCatchDialog";
import { Button } from "@/components/Button/Button";
import { DialogButton } from "@/components/dialog/Dialog";
const PokemonAbout = React.lazy(
    () => import("@/components/Pokemons/PokemonAbout")
);
const PokemonDetailInfo = React.lazy(
    () => import("@/components/Pokemons/PokemonDetailInfo")
);
const PokemonStats = React.lazy(
    () => import("@/components/Pokemons/PokemonStats")
);

const PokemonMoves = React.lazy(
    () => import("@/components/Pokemons/PokemonMoves")
);

type RouteParams = {
    name: string;
};

const PokemonDetailContainer = styled.div`
    display: flex;
    min-height: 100vh;
    @media screen and (max-width: 991px) {
        flex-direction: column;
        min-height: auto;
    }
`;

const FABContainer = styled.div`
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    @media screen and (max-width: 991px) {
        right: 1rem;
        bottom: 1rem;
        left: inherit;
        transform: translateX(x);
    }
`;

const FABCatchIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;

const PokemonDetail = () => {
    const body = document.querySelector("body ") as HTMLBodyElement;
    const routeParams: RouteParams = useParams();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const { data, error, loading } = getPokemonByName({
        name: routeParams.name,
    });
    const [fabCatchIconSrc, setFabCatchIconSrc] =
        useState<string>("/icon/pokeball.svg");

    const [catchDialogVisible, setCatchDialogVisible] =
        useState<boolean>(false);

    const [afterCatchDialogVisible, setAfterCatchDialogVisible] =
        useState<boolean>(false);

    const [isCatched, setIsCatched] = useState<number>(0);

    let color = "";
    if (pokemon) {
        color = pokemon.types[0].type.name;
    }

    useEffect(() => {
        if (data) {
            setPokemon(data.pokemon);
        }
        return () => {
            setPokemon(undefined);
        };
    }, [data]);

    const successCatchDialogContent = (
        <>
            <p>Success Catching {pokemon?.name}</p>
        </>
    );

    const failedCatchDialogContent = (
        <>
            <p>Oh no! {pokemon?.name} got away.</p>
            <DialogButton
                bgColor={`var(--nature-${color})`}
                onClick={() => setAfterCatchDialogVisible(false)}
            >
                Confirm
            </DialogButton>
        </>
    );
    const handleOnMouseOver = () => {
        setFabCatchIconSrc("/icon/open-pokeball.svg");
    };

    const handleOnMouseLeave = () => {
        setFabCatchIconSrc("/icon/pokeball.svg");
    };
    const handleOnCatch = () => {
        setIsCatched(Math.floor(Math.random() * 2));
        setCatchDialogVisible(true);
        const catchingTimeout = setTimeout(() => {
            setCatchDialogVisible(false);
            clearInterval(catchingTimeout);
            setAfterCatchDialogVisible(true);
            if (isCatched === 1) {
            }
        }, 3000);
    };

    if (error) return <p>error {error.message}</p>;

    if (loading) return <Loader />;

    if (pokemon) {
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <PokemonDetailContainer>
                        <PokemonDetailInfo pokemon={pokemon} />
                        <Tabs>
                            <Tab label="about" tabName="About">
                                <PokemonAbout pokemon={pokemon} />
                                <PokemonStats
                                    color={color}
                                    stats={pokemon.stats}
                                />
                            </Tab>
                            <Tab label="move" tabName="Move">
                                <PokemonMoves
                                    color={color}
                                    moves={pokemon.moves}
                                />
                            </Tab>
                        </Tabs>
                    </PokemonDetailContainer>
                    {createPortal(
                        <FABContainer>
                            <FloatingActionButton
                                onMouseOver={handleOnMouseOver}
                                onMouseLeave={handleOnMouseLeave}
                                size="3rem"
                                color={`var(--nature-${color})`}
                                onClick={handleOnCatch}
                            >
                                <FABCatchIcon src={fabCatchIconSrc} />
                            </FloatingActionButton>
                        </FABContainer>,
                        body
                    )}
                    {catchDialogVisible && <CatchingDialog />}
                    {/* {afterCatchDialogVisible && (
                        <AfterCatchDialog>
                            {isCatched === 1 && successCatchDialogContent}
                            {isCatched === 0 && failedCatchDialogContent}
                        </AfterCatchDialog>
                    )} */}
                    <AfterCatchDialog>
                        {successCatchDialogContent}
                        
                    </AfterCatchDialog>
                </Suspense>
            </>
        );
    }

    return <div>No result found</div>;
};

export default PokemonDetail;
