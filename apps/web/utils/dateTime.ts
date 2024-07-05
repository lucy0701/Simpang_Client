export const getExpirationDate = (date: number) => new Date((date + 9 * 3600) * 1000);

export const dateSplit = (dateString: string) => dateString.split('T')[0]!.replaceAll('-', '.');

export const getTimeDifference = (dateString: string) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const timeDifference: number = +currentDate - +targetDate;

  const minutes = Math.floor(timeDifference / (60 * 1000));
  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} 년 전`;
  } else if (months > 0) {
    return `${months} 개월 전`;
  } else if (days > 0) {
    return `${days} 일 전`;
  } else if (hours > 0) {
    return `${hours} 시간 전`;
  } else if (minutes > 0) {
    return `${minutes} 분 전`;
  } else if (minutes === 0) {
    return `방금 전`;
  }
};
