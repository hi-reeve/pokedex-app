import styled from "@emotion/styled";

export const PokemonNatureContainer = styled.div`
    display: flex;
`;

type PokemonNatureProps = {
    type: string;
};
export const PokemonNature = styled.div<PokemonNatureProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--rounded);
    margin-right: 1rem;
`;
export const PokemonNatureIcon = styled.img`
    width: 24px;
    height: 24px;
`;
export const PokemonNatureName = styled.div`
    margin-left: 0.25rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 0.8rem;
`;
