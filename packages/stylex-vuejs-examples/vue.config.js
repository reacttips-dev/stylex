const StylexPlugin = require('@ladifire-opensource/stylex-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            new StylexPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    use: [
                        {
                            loader: StylexPlugin.loader,
                            options: {
                                inject: true,
                            },
                        },
                    ],
                },
            ],
        },
    },
}
