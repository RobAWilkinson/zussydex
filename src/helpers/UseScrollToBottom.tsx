import {useEffect} from "react";
import {throttle} from "lodash";

export const useScrollToBottom = (onScrollToBottom: () => void) => {
    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 100; // Adjust the threshold as needed

            if (scrollPosition >= threshold) {
                onScrollToBottom();
            }
        }, 2000);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [onScrollToBottom]);
};