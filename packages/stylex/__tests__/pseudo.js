/* eslint-env jest */
const babelCliTransform = require("./babel-cli-transforms");

it("pseudo", () => {
  const input = `
    import stylex from '@ladifire-opensource/stylex';
    const styles = stylex.create({
      root: {
        color: "red",
        backgroundColor: "blue",

        ":before": {
          color: "blue"
        },
      },
    });
        var a = styles('root', 'button');
  `;
  const {code} = babelCliTransform(input);

  console.log("___code", code);

  expect(code).toMatchSnapshot();
});
