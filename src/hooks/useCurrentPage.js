import React, { useEffect, useState } from 'react';
import useSearchParam from "./useSearchParam";

const useCurrentPage = () => {
    const [currentPage, setCurrentPage] = useState();

    useSearchParam({ paramName: "page", paramValue: currentPage, setParamValue: setCurrentPage, initialValue: 1})

    return { currentPage, setCurrentPage };
}

export default useCurrentPage;