import { useState, useEffect } from 'react';
import styled from 'styled-components';

function Pagination({ className, totalPages = 10, setCurrentPage = {} }) {
  const [currentButton, setCurrentButton] = useState(1);
  const [arrayPages, setArrayPages] = useState([]);

  const pages = Array.from({ length: totalPages }).map((_, index) => index + 1);

  const handleClickPrev = () =>
    setCurrentButton((prev) => (prev === 1 ? prev : prev - 1));

  const handleClickNext = () =>
    setCurrentButton((prev) => (prev === totalPages ? prev : prev + 1));

  useEffect(() => {
    let tempArrayPages = [...arrayPages];
    const initialDots = '...';
    const leftDots = '... ';
    const rightDots = ' ...';

    if (pages.length < 6) {
      tempArrayPages = pages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempArrayPages = [1, 2, 3, 4, initialDots, pages.length];
    } else if (currentButton === 4) {
      tempArrayPages = [...pages.slice(0, 5), initialDots, pages.length];
    } else if (currentButton > 4 && currentButton < pages.length - 2) {
      tempArrayPages = [
        1,
        leftDots,
        ...pages.slice(currentButton - 2, currentButton),
        ...pages.slice(currentButton, currentButton + 1),
        rightDots,
        pages.length,
      ];
    } else if (currentButton > pages.length - 3) {
      tempArrayPages = [1, leftDots, ...pages.slice(pages.length - 4)];
    } else if (currentButton === initialDots) {
      setCurrentButton(arrayPages[arrayPages.length - 3] + 1);
    } else if (currentButton === leftDots) {
      setCurrentButton(arrayPages[3] - 2);
    } else if (currentButton === rightDots) {
      setCurrentButton(arrayPages[3] + 2);
    }

    setArrayPages(tempArrayPages);
    setCurrentPage(currentButton);
  }, [currentButton]);

  return (
    <ul className={className}>
      <button onClick={handleClickPrev} disabled={currentButton === 1}>
        Prev
      </button>
      {arrayPages.map((page) => {
        return (
          <li
            key={page}
            className={currentButton === page ? 'active' : ''}
            onClick={() => setCurrentButton(page)}
          >
            {page}
          </li>
        );
      })}
      <button onClick={handleClickNext} disabled={currentButton === totalPages}>
        Next
      </button>
    </ul>
  );
}

const PaginationStyled = styled(Pagination)`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;

  > button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;

    &:not(:disabled):hover {
      color: red;
    }

    &:disabled:hover {
      cursor: not-allowed;
    }
  }

  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    list-style: none;
    width: fit-content;
    width: 20px;
    height: 20px;
    background-color: brown;
    margin: 0 4px;
    border-radius: 50%;
    color: white;
    cursor: pointer;

    &.active {
      background-color: red;
    }
  }
`;

export default PaginationStyled;
