# Nuxt.js boilerplate for big and scalable projects

The cure for headaches in development projects on Vue + Nuxt.js.

## <a name="inside">What’s Inside?</a>
- [Nuxt.js](https://nuxtjs.org/) as a platform
- [Storybook](https://storybook.js.org/) for developing UI components in isolation
- [Vuex](https://vuex.vuejs.org/ru/)
- [SCSS](https://sass-lang.com/documentation)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/user-guide)
- [Prettier](https://prettier.io/) (doesn't conflict with eslint and stylelint rules)
- [Templateman](https://github.com/adlite/templateman)
- Production assets optimization: [CSSO](https://github.com/css/csso) and [SVGO](https://github.com/Klathmon/imagemin-webpack-plugin#optionssvgo)
- Webpack [vue-svg-loader](https://vue-svg-loader.js.org/)
- Prepared basic components and files structure
- Git-hooks with ESLint, Stylelint and Prettier checks

## <a name="get-started">Getting Started</a>
### Environment
Prerequisites:
- Node.js v12.x.x+
- Npm v6.x.x+

### Installing dependencies
To initialize project you should install dependencies from `package-lock.json` file via:
```
npm ci
```

### Launch development version
To start Nuxt development server:
```
npm run app:dev
```
Then open `http://localhost:3000`.

### Launch Storybook development version
To start Storybook development server:
```
npm run storybook:dev
```
Then open `http://localhost:3001`.

### Launch both
To start Nuxt and Storybook in parallel:
```
npm run dev
```

### Linters
You can lint all you code in parallel running:
```
npm run linters:inspect
```

If it's possible you can inspect and autofix issues by linters running:
```
npm run linters:fix
```
