module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@native-base/icons": "@native-base/icons/lib",
          },
        },
      ],
    ],
  }
}
