import useDeviceType from "@/hooks/useDeviceType";
import { useFormatMove, useToCapitalize } from "@/hooks/useFormatter";
import { PokemonMove, PokemonMoveDetail } from "@/types/Pokemons";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../Button/Button";
import SimpleDialog from "../dialog/SimpleDialog";
import {
    AboutContainer,
    AboutTitle,
    AboutWrapper,
} from "./PokemonDetailElement";
import {
    PokemonNature,
    PokemonNatureContainer,
    PokemonNatureIcon,
    PokemonNatureName,
} from "./PokemonNature";

const MoveName = styled.h4``;

const MoveTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const MoveClassName = styled.span`
    font-size: 0.9rem;
`;
const MoveTableHead = styled.th`
    border: 1px solid #ddd;
    background-color: var(--dark-gray);
    color: white;
    padding: 1rem;
    font-size: 1.1rem;
    @media screen and (max-width: 525px) {
        font-size: 0.9rem;
    }
`;

const MoveTableColumn = styled.td`
    border: 1px solid #ddd;
    padding: 1rem;
    font-size: 1rem;
    @media screen and (max-width: 525px) {
        font-size: 0.8rem;
    }
`;

const ButtonViewDetails = styled(Button)`
    padding: 0.5rem 1rem;
    background-color: var(--nature-water-light);
    color: white;
    border-radius: var(--rounded);
    @media screen and (max-width: 525px) {
        font-size: 0.8rem;
        padding: 0.25rem 1rem;
    }
`;

const MoveDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MoveDetailWrapper = styled.div`
    display: flex;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    &:not(:last-child) {
        border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
    }
`;

const MoveDetailLabel = styled.span`
    font-size: 0.9rem;
    font-weight: bold;
`;

const MoveDetailText = styled.span`
    font-size: 0.9rem;
    margin-left: 0.5rem;
`;

const MoveDetailDesc = styled.p`
    font-size: 0.9rem;
    line-height: 1.5rem;
	white-space: pre-line;
`;

type Props = {
    moves: PokemonMove[];
    color: string;
};
const PokemonMoves: React.FC<Props> = ({ color, moves }) => {
    const [moveList, setMoveList] = useState<PokemonMoveDetail[]>([]);

    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
    const [selectedMove, setSelectedMove] = useState<PokemonMoveDetail>();
    const [loading, setLoading] = useState<boolean>(false);
    const { isDesktop } = useDeviceType();
    const fetchMoveDetail = async () => {
        const arrayMove: PokemonMoveDetail[] = [];

        moves.map(async move => {
            const response = await fetch(move.move.url);
            const detail: PokemonMoveDetail = await response.json();
            setMoveList(oldMove => [...oldMove, detail]);
        });

        return arrayMove;
    };

    useEffect(() => {
        fetchMoveDetail();
        return () => {
            setMoveList(() => []);
            setLoading(false);
            setSelectedMove(undefined);
            setDetailsVisible(false);
        };
    }, []);

    const renderDetails = () => {
        if (selectedMove) {
            return (
                <>
                    <MoveDetailContainer>
                        <MoveDetailWrapper>
                            <MoveDetailLabel>Name : </MoveDetailLabel>
                            <MoveDetailText>
								{useFormatMove(selectedMove.name)}
                            </MoveDetailText>
                        </MoveDetailWrapper>
                        <MoveDetailWrapper>
                            <MoveDetailLabel>Accuracy : </MoveDetailLabel>
                            <MoveDetailText>
                                {selectedMove.accuracy
                                    ? `${selectedMove.accuracy}%`
                                    : "-"}
                            </MoveDetailText>
                        </MoveDetailWrapper>
                        <MoveDetailWrapper>
                            <MoveDetailLabel>Power : </MoveDetailLabel>
                            <MoveDetailText>
                                {selectedMove.power ?? "-"}
                            </MoveDetailText>
                        </MoveDetailWrapper>
                        <MoveDetailWrapper>
                            <MoveDetailLabel>PP : </MoveDetailLabel>
                            <MoveDetailText>
                                {selectedMove.pp ?? "-"}
                            </MoveDetailText>
                        </MoveDetailWrapper>
                        <MoveDetailWrapper>
                            <MoveDetailLabel>Category : </MoveDetailLabel>
                            <MoveDetailText>
                                {useToCapitalize(
                                    selectedMove.damage_class.name
                                )}
                            </MoveDetailText>
                        </MoveDetailWrapper>
                        <MoveDetailWrapper>
                            <MoveDetailLabel>Type : </MoveDetailLabel>
                            <MoveDetailText>
                                <PokemonNatureContainer>
                                    <PokemonNature
                                        type={selectedMove.type.name}
                                    >
                                        <PokemonNatureIcon
                                            src={`/icon/${selectedMove.type.name}-type-icon.svg`}
                                            alt={selectedMove.type.name}
                                            width="24px"
                                            height="24px"
                                        />
                                        <PokemonNatureName>
                                            {selectedMove.type.name}
                                        </PokemonNatureName>
                                    </PokemonNature>
                                </PokemonNatureContainer>
                            </MoveDetailText>
                        </MoveDetailWrapper>
                        <MoveDetailWrapper>
                            <MoveDetailDesc>
                                {selectedMove.effect_entries[0].effect}
                            </MoveDetailDesc>
                        </MoveDetailWrapper>
                    </MoveDetailContainer>
                    <ButtonViewDetails
                        style={{
                            marginTop: "8px",
                            marginLeft: "auto",
                        }}
                        onClick={() => setDetailsVisible(false)}
                    >
                        Done
                    </ButtonViewDetails>
                </>
            );
        }

        return <></>;
    };
    const handleViewDetails = (name: string) => {
        setDetailsVisible(true);
        const move = moveList.find(move => move.name === name);
        if (move) {
            setSelectedMove(move);
        }
    };

    const tableData = useMemo(() => {
        return moveList
            .sort(({ name: prevName }, { name: currentName }) => {
                if (prevName < currentName) return -1;
                else if (prevName > currentName) return 1;
                return 0;
            })
            .map(move => (
                <tr key={move.name}>
                    <MoveTableColumn>
                        <MoveName>{useFormatMove(move.name)}</MoveName>
                    </MoveTableColumn>
                    {isDesktop && (
                        <>
                            <MoveTableColumn>
                                <PokemonNatureContainer>
                                    <PokemonNature type={move.type.name}>
                                        <PokemonNatureIcon
                                            src={`/icon/${move.type.name}-type-icon.svg`}
                                            alt={move.type.name}
                                            width="24px"
                                            height="24px"
                                        />
                                        <PokemonNatureName>
                                            {move.type.name}
                                        </PokemonNatureName>
                                    </PokemonNature>
                                </PokemonNatureContainer>
                            </MoveTableColumn>
                            <MoveTableColumn>
                                <MoveClassName>
                                    {" "}
                                    {useToCapitalize(move.damage_class.name)}
                                </MoveClassName>
                            </MoveTableColumn>
                        </>
                    )}
                    <MoveTableColumn>
                        <ButtonViewDetails
                            onClick={() => handleViewDetails(move.name)}
                        >
                            View Details
                        </ButtonViewDetails>
                    </MoveTableColumn>
                </tr>
            ));
    }, [moveList]);
    if (loading) return <p>Loading...</p>;
    return (
        <AboutContainer>
            <AboutTitle color={color}>Move List Table</AboutTitle>
            <AboutWrapper>
                <MoveTable>
                    <thead>
                        <tr>
                            <MoveTableHead>Name</MoveTableHead>
                            {isDesktop && (
                                <>
                                    <MoveTableHead>Type</MoveTableHead>
                                    <MoveTableHead>Category</MoveTableHead>
                                </>
                            )}
                            <MoveTableHead>Actions</MoveTableHead>
                        </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                </MoveTable>
            </AboutWrapper>
            {detailsVisible && <SimpleDialog>{renderDetails()}</SimpleDialog>}
        </AboutContainer>
    );
};

export default PokemonMoves;
