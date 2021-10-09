/// <reference types="react-scripts" />

interface UsePaginationProps {
    contentPerPage: number,
    count: number,
}

interface UsePaginationReturn {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    firstContentIndex: number;
    lastContentIndex: number;
}

type UsePagination = (UsePaginationProps) => (UsePaginationReturn);