# STYLES

## Directory structure

```
./styles
 ├─resources/
 ├─vendor/
 ├─base.scss
 └─storybook.scss
```

- `/styles/resources/` - SCSS variables, mixins and functions used in SCSS.
  All of them are available globally in each component
- `/styles/vendor/` - libraries vendor styles
- `/styles/base.scss` - general styles for the whole application (i.e. `body`, `a` or `html`)
- `/styles/storybook.scss` - Storybook overrides


#### Media queries

All breakpoints and mixins for media queries are configured in the file `/styles/resources/grid.scss`.
Each breakpoint is a maximum width from 0 to the specified value.
For example, the breakpoint `tablet` would mean all devices up to 1024px.

For example, let's say we want to create a media query for styles on mobile devices.

Bro:

```scss
.selector {
  // Styles for the desktop

  @include on-phone() {
    // Styles for the phone
  }
}
```

Not bro:

```scss
.selector {
  // Styles for the desktop
}

@media all and (max-width: 767px) {
  .selector {
    // Styles for the phone
  }
}
```

#### Working with url (...)

Since Sass implementations do not support URL rewriting, all resources must have relative paths.

To work around this problem and access the `/static` folder, you can interpolate the `$static-path` variable in the file path, for example:

```scss
.image {
  background-image: url('#{$static-path}/assets/images/image.webp');
}
```
