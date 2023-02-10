import styled from "styled-components";

const paginationStyles = styled.div`
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 22px 0;
    border-radius: 4px;
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    color: #2c689c;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-left: -1px;
  }
  .pagination > li:first-of-type > a,
  .pagination > li:first-of-type > span {
    margin-left: 0;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
  .pagination > li > a:hover,
  .pagination > li > span:hover,
  .pagination > li > a:focus,
  .pagination > li > span:focus {
    z-index: 2;
    color: #1b4060;
    background-color: #eeeeee;
    border-color: #ddd;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    z-index: 3;
    color: #fff;
    background-color: #2c689c;
    border-color: #2c689c;
    cursor: default;
  }
  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus,
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
    color: #777777;
    background-color: #fff;
    border-color: #ddd;
    cursor: not-allowed;
  }
  .pagination-lg > li > a,
  .pagination-lg > li > span {
    padding: 10px 16px;
    font-size: 20px;
    line-height: 1.3333333;
  }
  .pagination-lg > li:first-of-type > a,
  .pagination-lg > li:first-of-type > span {
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
  }
  .pagination-lg > li:last-child > a,
  .pagination-lg > li:last-child > span {
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
  }
  .pagination-sm > li > a,
  .pagination-sm > li > span {
    padding: 5px 10px;
    font-size: 14px;
    line-height: 1.5;
  }
  .pagination-sm > li:first-of-type > a,
  .pagination-sm > li:first-of-type > span {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }
  .pagination-sm > li:last-child > a,
  .pagination-sm > li:last-child > span {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
`;

export default paginationStyles;