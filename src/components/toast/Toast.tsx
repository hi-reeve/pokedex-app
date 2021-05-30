import styled from "@emotion/styled";

export const SimpleToast = styled.div`
    cursor: pointer;
    padding: 0.5rem 2rem;
    position: fixed;
    font-size: 0.8rem;
    top: 1rem;
    left: 50%;
    width: max-content;
    max-width: 50vw;
    transform: translateX(-50%);
    background-color: var(--nature-grass);
	color : white;
    box-shadow: var(--shadow);
    border-radius: var(--rounded);
    z-index: 11000;
`;
