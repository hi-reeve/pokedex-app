import styled from "@emotion/styled";

export const InputText = styled.input`
    padding: 0.5rem 0.5rem;
    border: none;
    border-bottom: 1px solid var(--dark-gray);
`;

export const InputError = styled.span`
    font-size: 0.8rem;
    color: var(--invalid-input);
	margin-top: .25rem;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
`