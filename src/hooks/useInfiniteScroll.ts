import { useEffect } from "react";

type InfiniteScrollArgs = {
    onLoadMore: () => void;
    loadMoreMargin?: number;
};

const getWindowTop = () => {
    return (
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop
    );
};
export default function useInfiniteScroll(args: InfiniteScrollArgs) {
    const { onLoadMore, loadMoreMargin } = args;
    let margin = loadMoreMargin ?? 50;

    const scrollTop = getWindowTop();
    const handleOnMore = () => {
        const currentTop = getWindowTop();
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        // if user scroll down not up
        if (scrollTop < currentTop) {
            
            if (currentTop + window.innerHeight + margin >= scrollHeight) {
                onLoadMore();
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleOnMore);
        return () => {
            window.removeEventListener("scroll", handleOnMore);
        };
    }, []);
}
