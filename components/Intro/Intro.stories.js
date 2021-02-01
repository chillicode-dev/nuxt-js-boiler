import {makeStory} from '@/utils/storybook';
import Intro from './Intro';

export default {
  title: 'App/Intro',
  component: Intro,
  argTypes: {},
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {Intro},
  template: '<Intro v-bind="$props">This is Intro component</Intro>',
});

export const Default = makeStory(Template, {});
