import { policyString } from './policy';
import { termsString } from './terms';

export const Terms = () => <p className='legalText'>{termsString}</p>;
export const Policy = () => <p className='legalText'>{policyString}</p>;
