import React, { useState, useEffect } from "react";
interface Gap {
  before: boolean;
  paginationGroup: number[];
  after: boolean;
}
const usePagination: UsePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  // like 3 dots that surrounds the immediate pages
  const [gaps, setGaps] = useState<Gap>({
    before: false,
    paginationGroup: [],
    after: true,
  });
  // number of pages in total (total items / content on each page)
  const pageCount = Math.ceil(count / contentPerPage);
  // index of last item of current page
  const lastContentIndex = page * contentPerPage;
  // index of first item of current page
  const firstContentIndex = lastContentIndex - contentPerPage;
  //Pages between the first and last pages
  const [pagesInBetween, setPagesInBetween] = useState<number[]>([]);

  useEffect(() => {
    if (pageCount > 2) {
      const temp = new Array(pageCount - 2).fill(1).map((_, i) => i + 2);
      setPagesInBetween(temp);
    }
  }, [pageCount]);

  // to set the pages between the gaps depending on position of current page
  //and to setGaps Depending on position of current page
  useEffect(() => {
    const currentLocation = pagesInBetween.indexOf(page);
    let paginationGroup = [];
    let before = false;
    let after = false;
    if (page === 1) {
      paginationGroup = pagesInBetween.slice(0, 3);
    } else if (
      page === pageCount ||
      page === pageCount - 1 ||
      page === pageCount - 2
    ) {
      paginationGroup = pagesInBetween.slice(-3, pageCount);
    } else if (page === 2) {
      paginationGroup = pagesInBetween.slice(
        currentLocation,
        currentLocation + 3
      );
    } else {
      paginationGroup = [page - 1, page, page + 1];
    }
    if (pageCount <= 5) {
      before = false;
      after = false;
    } else {
      before = false;
      after = false;
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[2] < pageCount - 1) {
        after = true;
      }
    }
    setGaps({ paginationGroup, before, after });
  }, [page, pagesInBetween, pageCount]);

  // change page based on direction either front or back
  const changePage = (direction: boolean) => {
    setPage((state) => {
      // move forward
      if (direction) {
        // if page is the last page, do nothing
        if (state === pageCount) {
          return state;
        }
        return state + 1;
        // go back
      } else {
        // if page is the first page, do nothing
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = (num: number) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      setPage(pageCount);
      // if number is less than 1, set page to first page
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
    gaps,
  };
};

export default usePagination;
