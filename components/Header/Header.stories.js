import {makeStory} from 'utils/storybook';
import Header from './Header';

export default {
  title: 'App/Header',
  component: Header,
  argTypes: {},
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {Header},
  template: '<Header v-bind="$props">This is Header component</Header>',
});

export const Default = makeStory(Template, {});
