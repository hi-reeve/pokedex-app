import styled from "@emotion/styled";

export const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AboutWrapper = styled.div`
    display: flex;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    flex-direction: row;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
`;

type AbouTitleProps = {
    color: string;
};
export const AboutTitle = styled.h4<AbouTitleProps>`
    text-transform: capitalize;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: ${({ color }) => `var(--nature-${color})`};
    font-size: 1.5rem;
    @media screen and (max-width: 525px) {
        font-size: 1.2rem;
    }
`;
export const AboutSubTitle = styled.p`
    font-size: 0.8rem;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
    flex: 0.6;
`;
export const AboutListWrapper = styled.ol`
    list-style-type: none;
    flex: 1;
`;

export const AboutListItem = styled.li`
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

export const AboutLabel = styled.p`
    font-weight: 400;
    flex: 1;
    margin: 0;
    font-size: 0.8rem;
    display: block;
`;
