import React from "react";
import ReactPaginate from "react-paginate";

import PaginationStyle from "./Pagination.Style";

type Props = {
  pageCount: number;
  onPageChange: (data: { selected: number }) => void;
};

const Pagination: React.FC<Props> = (props: Props) => {
  return (
    <PaginationStyle>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={props.onPageChange}
        containerClassName="pagination"
        pageClassName="pages pagination"
        activeClassName="active"
      />
    </PaginationStyle>
  );
};

export default Pagination;
