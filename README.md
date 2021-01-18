# About Stylex

NOTE: Sylex will be released on February 1, 2021. Give this repo a star!

See Facebook React conf video for about Stylex: [Click here](https://youtu.be/9JZHodNR184?t=229)

## Join Stylex Community (Facebook group)
Visit [this link](https://www.facebook.com/groups/713597106002279) to join Stylex community.

## How to use?

### Create new stylex object ```(stylex.create)```

This method will create a new stylex object:

```
const styles = stylex.create({
  root: {
    fontWeight: 700,
    color: "blue"
  },
  button: {
    borderRadius: 8,
  },
});
```

Then we can use as:

```
<div className={stylex(styles.root)}>
  Component
</div>
```

### Dedupe stylex objects ```(stylex.dedupe)```

This method will dedupe (override) duplicate style properties:

```
<div
    className={stylex.dedupe(
      {
        color: "var(--primary-text)",
      },
      isError ? {
        color: "var(--negative)"
      } : null,
    )}
  >
    Dedupe
</div>
```

### Create a keyframes animation name ```(stylex.keyframes)```

### Compose (merge) stylex objects ```(stylex.compose)```

## Theming support

## Stylex setups

### Webpack

#### Inject css to compiled js

#### Separate css into .css files

### babel

### SSR

## Typescript support


