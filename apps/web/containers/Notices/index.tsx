'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PATHS } from '@/constants';
import { apiBe, getHeaders } from '@/services';
import { GetPageData, INotice, NoticeType } from '@/types';
import { decodeToken_csr } from '@/utils';
import { dateSplit } from '@/utils/dateTime';

import styles from './index.module.scss';
import { Loading } from '@/components/Loading';
import PageNavigator from '@/components/PageNavigator';

export default function Notices() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<NoticeType>('');
  const router = useRouter();
  const user = decodeToken_csr();

  const { data: notices, status } = useQuery({
    queryKey: ['notice', page, type],
    queryFn: async () => {
      const headers = getHeaders();
      const params = {
        page,
        size: 10,
        sort: 'desc',
        filter: type !== '' ? { type } : {},
      };
      const res = await apiBe<GetPageData<INotice>>(`/v1/notices`, { params, headers });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const totalPages = notices?.totalPage || 0;
  const handlePage = (pageNum: number) => setPage(pageNum);
  const onClickFilterBtn = (filterText: NoticeType) => setType(filterText);

  return status === 'pending' ? (
    <Loading />
  ) : (
    <div>
      <div className={styles.btnContainer}>
        <div className={styles.btnBox}>
          <button
            className={cx(type === '' ? 'ivory' : 'yellow')}
            onClick={() => onClickFilterBtn('')}
          >
            전체보기
          </button>
          <button
            className={cx(type === 'notice' ? 'ivory' : 'yellow')}
            onClick={() => onClickFilterBtn('notice')}
          >
            공지사항
          </button>
          <button
            className={cx(type === 'update' ? 'ivory' : 'yellow')}
            onClick={() => onClickFilterBtn('update')}
          >
            업데이트
          </button>
        </div>
        {user?.role === 'Admin' && (
          <button className={styles.addBtn} onClick={() => router.push(PATHS.NOTICES.REGISTER)}>
            +
          </button>
        )}
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {notices!.data.map((notice, i) => (
              <tr
                className={styles.tableContent}
                key={i}
                onClick={() => router.push(PATHS.NOTICES.BASE + '/' + notice._id)}
              >
                <td className={styles.iconTd}>
                  {notice.type === 'notice' ? (
                    <div className={styles.noticeIcon} />
                  ) : (
                    <div className={styles.updateIcon} />
                  )}
                </td>
                <td className={styles.title}>{notice.title}</td>
                <td className={styles.createAt}>{dateSplit(notice.createdAt!)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PageNavigator page={page} totalPages={totalPages} setPage={handlePage} />
    </div>
  );
}
