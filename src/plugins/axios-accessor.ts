import { Plugin } from '@nuxt/types';
import { initializeAxios } from '@/util/axios';

export const accessor: Plugin = ({ $axios }): void => {
  initializeAxios($axios);
};

export default accessor;