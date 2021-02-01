import {makeStory} from '@/utils/storybook';
import ${TM:COMPONENT_NAME_PASCAL_CASE} from './${TM:COMPONENT_NAME_PASCAL_CASE}';

export default {
  title: 'App/${TM:COMPONENT_NAME_PASCAL_CASE}',
  component: ${TM:COMPONENT_NAME_PASCAL_CASE},
  argTypes: {},
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {${TM:COMPONENT_NAME_PASCAL_CASE}},
  template: '<${TM:COMPONENT_NAME_PASCAL_CASE} v-bind="$props">This is ${TM:COMPONENT_NAME_PASCAL_CASE} component</${TM:COMPONENT_NAME_PASCAL_CASE}>',
});

export const Default = makeStory(Template, {});
