import Vue from 'vue';

import NuxtLink from '@/.storybook/components/NuxtLink';
import ClientOnly from '@/.storybook/components/ClientOnly';

import '@/styles/base.scss';
import '@/styles/storybook.scss';

// Register Nuxt components
Vue.component('NuxtLink', NuxtLink);
Vue.component('ClientOnly', ClientOnly);

export const parameters = {
  backgrounds: {
    default: 'primary',
    values: [
      {
        name: 'primary',
        value: '#FFF',
      },
      {
        name: 'secondary',
        value: '#E1EBF3',
      },
    ],
  },
};
