import { FABContainer } from "@/components/Button/FloatingActionButton";
import styled from "@emotion/styled";
import { NavLink as RouterLink } from "react-router-dom";
export const NavContainer = styled.nav`
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
    box-shadow: var(--shadow);
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;
    z-index: 99;
    @media screen and (max-width: 991px) {
        padding: 1rem;
    }

    &.scrolled-down {
        transform: translateY(-90px);
    }
    &.scrolled-up {
        transform: translateY(0);
    }
`;

export const NavLogoContainer = styled.div`
    max-width: 8%;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 991px) {
        max-width: 15%;
    }
    @media screen and (max-width: 525px) {
        max-width: 25%;
    }
`;

export const NavLogo = styled.img`
    width: 100%;
    height: 100%;
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

export const NavMenu = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    @media screen and (max-width: 991px) {
        display: none;
    }
`;

export const NavLink = styled(RouterLink)`
    color: var(--dark-gray);
    position: relative;
    transition: all 0.1s ease-in-out;
    &:hover {
        font-weight: bold;
    }
    &.active {
        font-weight: bold;
    }
    @media screen and (max-width: 525px) {
        padding: 0.75rem 2rem;
    }
`;

export const NavMenuFABContainer = styled(FABContainer)`
    display: none;
    @media screen and (max-width: 991px) {
        right: 1rem;
        bottom: 1rem;
        display: flex;
    }
`;

export const NavSearch = styled.input``;
