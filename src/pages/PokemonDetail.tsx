import React, {
    Suspense,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { getPokemonByName } from "@/graphql/queries/getPokemonByName";
import { Pokemon } from "@/types/Pokemons";
import { useParams } from "react-router";
import Loader from "@/components/Loader";
import styled from "@emotion/styled";
import {
    FABContainer,
    FABIcon,
    FloatingActionButton,
} from "@/components/Button/FloatingActionButton";
import { createPortal } from "react-dom";
import { DialogButton } from "@/components/dialog/Dialog";
import { InputError, InputText, InputWrapper } from "@/components/input/Input";
import { addNewPokemon, checkExistingNickname } from "@/db/pokemon";
import { ToastContext } from "@/context/ToastContext";
import Spinner from "@/components/Loader/Spinner";
import useDeviceType from "@/hooks/useDeviceType";

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
        padding-bottom: 3rem;
    }
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

const FABCatchContainer = styled(FABContainer)`
    right: 5rem;
    bottom: 1rem;
`;

const InfoContainer = styled.div`
    width: 100%;
    display: "flex";
    flex-direction: "column";
    padding: 2rem;
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
    const { isTablet } = useDeviceType();

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
                    url: "",
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

    const nickInputRef = useRef<HTMLInputElement>(null);
    // success catch content
    const successCatchDialogContent = (
        <>
            <p>
                Gotcha! {pokemon?.name} was caught! Give nickname to your new
                pokemon.
            </p>
            <form onSubmit={handleSaveNewCatchedPokemon}>
                <InputWrapper>
                    <NickNameInput
                        autoFocus
                        color={color}
                        type="text"
                        placeholder="Nickname"
                        onChange={handleInputNickname}
                        value={nickname}
                        invalid={nickNameInputError !== null}
                        ref={nickInputRef}
                    />
                    {nickNameInputError !== null && (
                        <InputError>{nickNameInputError}</InputError>
                    )}
                </InputWrapper>
                <DialogButton
                    aria-label="Button save nickname"
                    type="submit"
                    bgColor={`var(--nature-${color})`}
                >
                    Save pokemon
                </DialogButton>
            </form>
        </>
    );

    // failed catch content
    const failedCatchDialogContent = (
        <>
            <p>Oh no! {pokemon?.name} got away!</p>
            <DialogButton
                aria-label="Button confirm failed catch pokemon"
                autoFocus
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
    const handleOnCatch = (e: React.MouseEvent) => {
        (e.target as HTMLButtonElement).blur();
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
                <Suspense
                    fallback={<Spinner color={`var(--nature-${color})`} />}
                >
                    <PokemonDetailContainer>
                        <PokemonDetailInfo
                            handleOnCatch={handleOnCatch}
                            pokemon={pokemon}
                        />
                        <InfoContainer>
                            <PokemonAbout pokemon={pokemon} />
                            <PokemonStats color={color} stats={pokemon.stats} />
                            <PokemonMoves color={color} moves={pokemon.moves} />
                        </InfoContainer>
                    </PokemonDetailContainer>
                    {isTablet &&
                        createPortal(
                            <FABCatchContainer>
                                <FloatingActionButton
                                    onMouseOver={handleOnMouseOver}
                                    onMouseLeave={handleOnMouseLeave}
                                    size="3rem"
                                    color={`var(--nature-${color})`}
                                    onClick={handleOnCatch}
                                >
                                    <FABIcon
                                        src={fabCatchIconSrc}
                                        alt="pokeball"
                                    />
                                </FloatingActionButton>
                            </FABCatchContainer>,
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

    return <Spinner color={`var(--nature-${color})`} />;
};

export default PokemonDetail;
