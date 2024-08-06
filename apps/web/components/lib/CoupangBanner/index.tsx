import styles from './index.module.scss';

const CoupangBanner = ({ src }: { src: string }) => (
  <iframe className={styles.iframe} src={src} width={680} height={80} referrerPolicy="unsafe-url" />
);

export const CoupangBanner_01 = () => (
  <CoupangBanner src="https://ads-partners.coupang.com/widgets.html?id=797953&template=carousel&trackingCode=AF3621377&subId=&width=680&height=90&tsource=" />
);

export const CoupangBanner_02 = () => (
  <CoupangBanner src="https://ads-partners.coupang.com/widgets.html?id=797956&template=carousel&trackingCode=AF3621377&subId=&width=680&height=140&tsource=" />
);
