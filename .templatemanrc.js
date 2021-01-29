/**
 * Templateman config
 * @see https://github.com/adlite/templateman
 */
module.exports = {
  templates: [
    {
      name: 'Vue component with Storybook stories',
      files: [
        {
          from: './templates/component.tm',
          to: './components/${TM:COMPONENT_NAME_PASCAL_CASE}/${TM:COMPONENT_NAME_PASCAL_CASE}.vue',
        },
        {
          from: './templates/component-export-module.tm',
          to: './components/${TM:COMPONENT_NAME_PASCAL_CASE}/index.js',
        },
        {
          from: './templates/component-stories.tm',
          to: './components/${TM:COMPONENT_NAME_PASCAL_CASE}/${TM:COMPONENT_NAME_PASCAL_CASE}.stories.js',
        },
      ],
    },
    {
      name: 'Vue component',
      files: [
        {
          from: './templates/component.tm',
          to: './components/${TM:COMPONENT_NAME_PASCAL_CASE}/${TM:COMPONENT_NAME_PASCAL_CASE}.vue',
        },
        {
          from: './templates/component-export-module.tm',
          to: './components/${TM:COMPONENT_NAME_PASCAL_CASE}/index.js',
        },
      ],
    },
    {
      name: 'Vue page section',
      files: [
        {
          from: './templates/component.tm',
          to: './sections/${TM:PAGE}/${TM:COMPONENT_NAME_PASCAL_CASE}/${TM:COMPONENT_NAME_PASCAL_CASE}.vue',
        },
        {
          from: './templates/component-export-module.tm',
          to: './sections/${TM:PAGE}/${TM:COMPONENT_NAME_PASCAL_CASE}/index.js',
        },
      ],
    },
  ],
};
