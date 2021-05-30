import React, { Suspense, useContext, useEffect, useState } from "react";
import { getPokemonByName } from "@/graphql/queries/getPokemonByName";
import { Pokemon } from "@/types/Pokemons";
import { useParams } from "react-router";
import { Tab, Tabs } from "@/components/ui/Tab/Tab";
import Loader from "@/components/Loader";
import styled from "@emotion/styled";
import { FloatingActionButton } from "@/components/Button/FloatingActionButton";
import { createPortal } from "react-dom";
import { DialogButton } from "@/components/dialog/Dialog";
import { InputError, InputText, InputWrapper } from "@/components/input/Input";
import { addNewPokemon, checkExistingNickname } from "@/db/pokemon";
import { ToastContext } from "@/context/ToastContext";

const CatchingDialog = React.lazy(
    () => import("@/components/dialog/CatchingDialog")
);
const AfterCatchDialog = React.lazy(
    () => import("@/components/dialog/AfterCatchDialog")
);
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

type NicknameInputProps = {
    color: string;
    invalid: boolean;
};
const NickNameInput = styled(InputText)<NicknameInputProps>`
    margin-top: 1rem;
    width: 100%;
    border-bottom: 1px solid
        ${({ color, invalid }) =>
            invalid ? `var(--invalid-input)` : `var(--nature-${color})`};

    background-color: ${({ invalid }) =>
        invalid ? "var(--invalid-input)" : ""};

    &:focus,
    &:active {
        outline: none;
        border: none;
        border-bottom: 1px solid
            ${({ color, invalid }) =>
                invalid ? `var(--invalid-input)` : `var(--nature-${color})`};
    }
    &::placeholder {
        color: ${({ color, invalid }) =>
            invalid ? `white` : `var(--nature-${color})`};
    }
`;

const PokemonDetail = () => {
    const body = document.querySelector("body ") as HTMLBodyElement;
    const toastContext = useContext(ToastContext);
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
    const [nickname, setNickname] = useState<string>("");
    const [nickNameInputError, setNicknameInputError] =
        useState<string | null>(null);

    // define pokemon color
    let color = "";
    if (pokemon) {
        color = pokemon.types[0].type.name;
    }

    // set the pokemon data
    useEffect(() => {
        if (data) {
            setPokemon(data.pokemon);
        }
        return () => {
            setPokemon(undefined);
        };
    }, [data]);

    const resetFormNickname = () => {
        setNicknameInputError(null);
        setNickname("");
        setAfterCatchDialogVisible(false);
    };
    // new catched pokemon
    const handleSaveNewCatchedPokemon = async (event: React.FormEvent) => {
        event.preventDefault();

        if (nickname && pokemon) {
            const isExist = await checkExistingNickname(nickname);
            if (!isExist) {
                addNewPokemon({
                    id: pokemon.id,
                    image: pokemon.sprites.front_default,
                    name: pokemon.name,
                    nickname,
                });
                toastContext.setMessageHandler(
                    "Pokemon added to my pokemon list"
                );
                toastContext.openToast();

                resetFormNickname();

                const toastTimeout = setTimeout(() => {
                    toastContext.closeToast();
                    clearTimeout(toastTimeout);
                }, 3000);
            } else {
                setNicknameInputError(
                    `nickname ${nickname} is already exists!`
                );
            }
        } else {
            setNicknameInputError(
                "Please input new nickname for your pokemon!"
            );
        }
    };

    const handleInputNickname = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (nickNameInputError !== null) {
            setNicknameInputError(null);
        }
        setNickname(event.target.value);
    };

    const successCatchDialogContent = (
        <>
            <p>
                Gotcha! {pokemon?.name} was caught! Give nickname to your new
                pokemon.
            </p>
            <form onSubmit={handleSaveNewCatchedPokemon}>
                <InputWrapper>
                    <NickNameInput
                        color={color}
                        type="text"
                        placeholder="Nickname"
                        onChange={handleInputNickname}
                        value={nickname}
                        invalid={nickNameInputError !== null}
                    />
                    {nickNameInputError !== null && (
                        <InputError>{nickNameInputError}</InputError>
                    )}
                </InputWrapper>
                <DialogButton type="submit" bgColor={`var(--nature-${color})`}>
                    Confirm
                </DialogButton>
            </form>
        </>
    );

    const failedCatchDialogContent = (
        <>
            <p>Oh no! {pokemon?.name} got away!</p>
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
	
	// on click catch button
    const handleOnCatch = () => {
        setIsCatched(Math.floor(Math.random() * 2));
        setCatchDialogVisible(true);
        const catchingTimeout = setTimeout(() => {
            setCatchDialogVisible(false);
            clearInterval(catchingTimeout);
            setAfterCatchDialogVisible(true);
        }, 2000);
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
                    {afterCatchDialogVisible && (
                        <AfterCatchDialog>
                            {isCatched === 1 && successCatchDialogContent}
                            {isCatched === 0 && failedCatchDialogContent}
                        </AfterCatchDialog>
                    )}
                </Suspense>
            </>
        );
    }

    return <div>No result found</div>;
};

export default PokemonDetail;
