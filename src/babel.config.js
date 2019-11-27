const babelConfig = {
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
      },
    ],
  ],
};


export default babelConfig;
