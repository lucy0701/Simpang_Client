import Image from 'next/image';

import styles from './index.module.scss';

export default function About() {
  return (
    <main className={styles.wrap}>
      <div className={styles.contentWrap}>
        <div className={styles.contentBox}>
          <h2>나를 알고, 더 나아가 상대를 알다</h2>
          <p>&quot;나는 어떤 사람일까?&quot;</p>
          <p>&quot;내가 왜 이렇게 느끼는 걸까?&quot;</p>
          <p>&quot;저 사람의 심리는 어떨까?&quot;</p>
          <p>
            MBTI는 이런 궁금증에 대한 해답을 제공하여 <br />
            많은 이들에게 흥미를 불러일으킵니다.
          </p>
          <p>
            그러나 매번 50, 60개의 문제를 풀어야 하는 <br />
            MBTI 검사는 꽤 번거로울 수 있습니다.
          </p>
        </div>
        <div className={styles.contentBox}>
          <h2>그래서 심팡이 탄생했습니다.</h2>
          <p>
            MBTI 검사는 물론이고 다양한 심리테스트를 <br />
            <span>누구나 손쉽게 즐길 수 있도록 만들었습니다.</span>
          </p>
          <p>
            <span>심팡</span>은 여러분이 즐길 수 있는 다양한 테스트를 제공하여, 변화하는 우리 자신과
            주변의 세계를 더 재미있게 탐험할 수 있도록 도와줍니다.
          </p>
          <p>함께 즐겁고 의미 있는 여정을 떠나봐요! 🚀</p>
        </div>
        <Image src="/images/pang.png" alt="logo" width={80} height={80} />
      </div>
    </main>
  );
}
