import hotkeys from "hotkeys-js";
import { useCallback, useEffect } from "react";

export const useHotKey = (keys, callback, deps = []) => {
    const memoisedCallback = useCallback(callback, deps);

    useEffect(() => {
        hotkeys.filter = () => {
            return true;
        };
        hotkeys(keys, memoisedCallback);

        return () => hotkeys.unbind(keys, memoisedCallback);
    }, [memoisedCallback]);
};
