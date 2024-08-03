import cx from 'classnames';

import styles from './index.module.scss';

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PageNavigator = ({ page, totalPages, setPage }: Props) => {
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePreviousPage} disabled={page === 1} className={styles.pageButton}>
        &lt; 이전
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          className={page === pageNum ? styles.activePage : ''}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className={cx(styles.pageButton, styles.pageMovementButton)}
      >
        다음 &gt;
      </button>
    </div>
  );
};

export default PageNavigator;
