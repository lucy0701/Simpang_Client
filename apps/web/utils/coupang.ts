import { COUPANG_VISIT } from '@/constants';

export const checkCoupangSiteVisit = () => {
  const coupangVisitData = localStorage.getItem(COUPANG_VISIT);

  if (!coupangVisitData) {
    return true;
  }

  const coupangVisitDate = new Date(coupangVisitData).getTime();
  const currentDate = new Date().getTime();
  const diff = Math.abs(coupangVisitDate - currentDate);

  if (diff > 43200000) {
    localStorage.removeItem(COUPANG_VISIT);
    return true;
  }
  return false;
};
