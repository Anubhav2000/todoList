import { useEffect } from 'react';

const useSearchParam = ({ paramName, paramValue, setParamValue, initialValue }) => {
    useEffect(() => {
        // Update the URL with the new query parameter
        const storeParamValue = localStorage.getItem(paramName);
        const paramValueToSet = paramValue || storeParamValue || initialValue;
        const newUrl = window.location.pathname + `?${paramName}=${String(paramValueToSet)}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        localStorage.setItem(paramName, paramValueToSet);
    }, [paramValue, paramName]);

    // Get the current query parameter from the URL
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramValueFromUrl = searchParams.get(paramName);
        if (paramValueFromUrl) {
            setParamValue(Number(paramValueFromUrl));
            localStorage.setItem(paramName, paramValueFromUrl);
        }
        else {
            const storedQueryParam = localStorage.getItem(paramName) || initialValue;
            if (storedQueryParam) {
                setParamValue(storedQueryParam);
            }
        }
    }, [paramName, initialValue]);
}

export default useSearchParam;

