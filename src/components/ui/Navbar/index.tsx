import React from "react";
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
