/* eslint-env jest */
const babelCliTransform = require("./babel-cli-transforms");

it('string', () => {
  const input = `
    import stylex from '@ladifire-opensource/stylex';
    const styles = stylex.create({
      root: {
        color: "red",
        backgroundColor: "blue",
      },
      button: {
        color: "var(--primary-text)"
      }
    });
        var a = styles('root', 'button');
  `;
  const {code} = babelCliTransform(input);
  expect(code).toMatchSnapshot();
});
