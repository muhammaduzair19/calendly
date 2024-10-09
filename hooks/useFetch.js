import { useState } from "react";

export const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setIsLoading(true);
        setError(null);
        console.log("=== use Fetch Outer");

        try {
            const response = await cb(...args);
            console.log("=== use Fetch Inner");
            setData(response);
            setError(null);
        } catch (error) {
            console.log("=== use Fetch Error", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, fn };
};
