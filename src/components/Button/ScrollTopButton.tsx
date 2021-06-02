import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { FloatingActionButton } from "./FloatingActionButton";

const ScrollTopButton = styled(FloatingActionButton)`
    position: fixed;
    bottom: 5rem;
    right: 1rem;
    transition: var(--default-transition);
	@media screen and (min-width : 992px) {
		bottom: 1rem;
	}
`;
const ChevronUpIcon = styled.svg`
    width: 24px;
    height: 24px;
    color: white;
    fill: white;
`;
const ScrollToTopButton: React.FC = () => {
    const scrollTopRef = useRef<HTMLButtonElement>(null);
    const handleOnScroll = (event: Event) => {
        if (scrollTopRef.current) {
            if (window.pageYOffset > 200) {
                scrollTopRef.current.style.opacity = "0.5";
            } else {
                scrollTopRef.current.style.opacity = "0";
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleOnScroll);
        return () => {
            window.removeEventListener("scroll", handleOnScroll);
        };
    }, []);
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <ScrollTopButton onClick={handleScrollTop} ref={scrollTopRef}>
            <ChevronUpIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-up"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
            </ChevronUpIcon>
        </ScrollTopButton>
    );
};

export default ScrollToTopButton;
