/**
 * Wrapper around basic Storybook story creation method
 * @param template {function}
 * @param args {object}
 * @returns {function}
 */
export const makeStory = (template, args = {}) => {
  const story = template.bind({});
  story.args = args;
  return story;
};
