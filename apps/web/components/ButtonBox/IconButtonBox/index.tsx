import cx from 'classnames';

import styles from './index.module.scss';
import { ContentData, LikeButton, LinkButton, ReplayButton, ResultData } from '../IconButtons';
import { KakaoSharingBtn } from '../SharingButtons';

export const IconButtonBox = ({ contentData }: ContentData) => (
  <div className={cx(styles.btnBox, styles.baseBox)}>
    <LikeButton contentId={contentData._id} />
    <KakaoSharingBtn contentData={contentData} />
    <LinkButton contentId={contentData._id} />
  </div>
);

export const ResultIconButtonBox = ({ resultData }: ResultData) => (
  <div className={cx(styles.btnBox, styles.resultBox)}>
    <LikeButton contentId={resultData.contentId} />
    <ReplayButton contentId={resultData.contentId} />
    <LinkButton contentId={resultData.contentId} />
  </div>
);
