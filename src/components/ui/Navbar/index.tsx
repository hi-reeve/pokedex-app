import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    NavContainer,
    NavLogoContainer,
    NavLogo,
    NavMenu,
    NavLink,
} from "./NavbarElement";
import PokemonLogo from "@/assets/images/pokemon-logo-min.png";
export const Navbar = () => {
    const handleOnScroll = (event: Event) => {
        // #TODO add navbar on scroll
    };
    useEffect(() => {
        window.addEventListener("scroll", handleOnScroll);
        return () => {
            window.removeEventListener("scroll", handleOnScroll);
        };
    }, []);
    return (
        <NavContainer>
            <NavLogoContainer>
                <Link to="/">
                    <NavLogo
                        src={PokemonLogo}
                        alt="Nav Logo"
                        width="100%"
                        height="100%"
                    />
                </Link>
            </NavLogoContainer>
            <NavMenu>
                <NavLink to="/my-pokemon">My Pokemon</NavLink>
            </NavMenu>
        </NavContainer>
    );
};
