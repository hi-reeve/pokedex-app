import React, { useState } from "react";
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
    const [isOpen, setIsOpen] = useState(false);
    return (
        <NavContainer>
            <NavLogoContainer>
                <Link to="/">
					<NavLogo src={PokemonLogo} alt="Nav Logo" width="100%" height="100%" />
                </Link>
            </NavLogoContainer>
            <NavMenu isOpen={isOpen}>
                <NavLink to="/my-pokemon">My Pokemon</NavLink>
            </NavMenu>
        </NavContainer>
    );
};
