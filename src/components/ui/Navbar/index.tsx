import React, { useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
    NavContainer,
    NavLogoContainer,
    NavLogo,
    NavMenu,
    NavLink,
    NavMenuFABContainer,
} from "./NavbarElement";
import PokemonLogo from "@/assets/images/pokemon-logo-min.webp";
import { Button } from "@/components/Button/Button";
import IconArrowLeft from "@/components/icon/IconArrowLeft";
import {
    FABIcon,
    FloatingActionButton,
} from "@/components/Button/FloatingActionButton";
import { createPortal } from "react-dom";
import useDeviceType from "@/hooks/useDeviceType";

export const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);
    const location = useLocation();
    const history = useHistory();
    const body = document.querySelector("body") as HTMLBodyElement;
	let lastScrollY = 0;
	
    const handleOnScroll = () => {
        const currentScrollY = window.scrollY;
        if (navRef.current) {
            if (window.pageYOffset > 200 && currentScrollY > lastScrollY) {
                navRef.current.classList.add("scrolled-down");
                navRef.current.classList.remove("scrolled-up");
            } else {
                navRef.current.classList.remove("scrolled-down");
                navRef.current.classList.add("scrolled-up");

                if (window.pageYOffset === 0) {
                    navRef.current.classList.remove("scrolled-up");
                    navRef.current.classList.remove("scrolled-down");
                }
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
        <>
            <NavContainer ref={navRef}>
                {location.pathname !== "/" && (
                    <Button onClick={() => history.push("/")}>
                        <IconArrowLeft width="24px" height="24px" />
                    </Button>
                )}
                <NavLogoContainer
                    style={{
                        marginLeft: location.pathname !== "/" ? "1rem" : "",
                    }}
                >
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
            {createPortal(
                <NavMenuFABContainer>
                    <FloatingActionButton
                        color="var(--nature-water)"
                        onClick={() => history.push("/my-pokemon")}
                    >
                        <FABIcon src="/icon/bag-icon.svg" />
                    </FloatingActionButton>
                </NavMenuFABContainer>,
                body
            )}
        </>
    );
};
