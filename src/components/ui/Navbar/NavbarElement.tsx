import styled from "@emotion/styled";
import { NavLink as RouterLink } from "react-router-dom";
export const NavContainer = styled.nav`
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 2rem;
    box-shadow: var(--shadow);
    position: relative;
    @media screen and (max-width: 991px) {
        padding: 1rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
    }
`;
export const NavLogoContainer = styled.div`
    max-width: 8%;

	@media screen and (max-width : 991px){
		max-width: 15%;
	}
    @media screen and (max-width: 525px) {
        max-width: 20%;
    }
`;

export const NavLogo = styled.img`
    width: 100%;
`;

export const NavBurger = styled.div`
    display: none;
    flex-direction: column;
    width: 30px;
    height: 30px;
    margin-left: auto;
    justify-content: space-evenly;
    cursor: pointer;
    @media screen and (max-width: 525px) {
        display: flex;
    }
`;

export const NavBurgerDiv = styled.div`
    display: block;
    min-width: 100%;
    height: 5px;
    background-color: var(--dark-gray);
    border-radius: var(--rounded);
`;

type NavMenuProps = {
    isOpen: boolean;
};
export const NavMenu = styled.div<NavMenuProps>`
    display: flex;
    flex-direction: row;
    margin-left: auto;
`;

export const NavLink = styled(RouterLink)`
    color: var(--dark-gray);
    position: relative;
    &:after {
        content: "";
        display: block;
        width: 0;
        height: 2px;
        border-radius: var(--rounded);
        background: var(--dark-gray);
        position: absolute;
        top: 150%;
        left: 0;
        transition: all 0.3s ease-in-out;
    }
    &:hover {
        &:after {
            width: 100%;
        }
    }
    @media screen and (max-width: 525px) {
        padding: 0.75rem 2rem;
    }
`;
