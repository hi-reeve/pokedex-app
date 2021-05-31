import { useEffect, useState } from "react";
export default function useDeviceType() {
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleChangeWindowResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleChangeWindowResize);
        return () => {
            window.removeEventListener("resize", handleChangeWindowResize);
        };
    }, []);

    return {
        isMobile: width <= 525,
        isTablet: width <= 991,
    };
}
