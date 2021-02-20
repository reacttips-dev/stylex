module.exports = {
  babel: {
    plugins: [
      [
        "@ladifire-opensource/babel-plugin-transform-stylex",
        {
          inject: true,
        },
      ],
    ],
  },
};
