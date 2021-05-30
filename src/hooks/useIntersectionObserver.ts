import { useCallback, useRef } from "react";

export default function useIntersectionObserver(
    cb: () => Promise<void> | void
) {
    const observer = useRef<IntersectionObserver | null>();

    const lastElemenRef = useCallback(element => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                cb();
            }
        });

        if (element) observer.current.observe(element);
    }, []);

    return { lastElemenRef };
}
