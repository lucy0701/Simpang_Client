import { policyString } from './Policy';
import { termsString } from './Terms';

export const Terms = () => <p className='legalText'>{termsString}</p>;
export const Policy = () => <p className='legalText'>{policyString}</p>;
