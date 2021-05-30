import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    NavContainer,
    NavLogoContainer,
    NavLogo,
    NavMenu,
    NavLink,
} from "./NavbarElement";
import PokemonLogo from "@/assets/images/pokemon-logo-min.webp";
export const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);
	let lastScrollY = 0;
	
    const handleOnScroll = () => {
        const currentScrollY = window.scrollY;
        navRef.current!.style.position = "fixed";
        navRef.current!.style.top = "0";
		navRef.current!.style.left = "0";
		
        if (window.pageYOffset > 10 && currentScrollY > lastScrollY) {
            navRef.current!.style.transform = "translateY(-90px)";
        } else {
            navRef.current!.style.transform = "translateY(0)";

            if (window.pageYOffset === 0) {
                navRef.current!.style.position = "relative";
            }
        }

        lastScrollY = currentScrollY;
    };
    useEffect(() => {
        window.addEventListener("scroll", handleOnScroll);
        return () => {
            window.removeEventListener("scroll", handleOnScroll);
        };
    }, []);
    return (
        <NavContainer ref={navRef}>
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
