const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

const createApiFile = TARGET_NODE
    ? './create-api-server.js'
    : './create-api-client.js'

const target = TARGET_NODE ? 'server' : 'client'
module.exports = {
    pwa: {
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            directoryIndex: 'null'
            // ...other Workbox options...
        }
    },
    configureWebpack: () => ({
        entry: `./src/entry-${target}`,
        target: TARGET_NODE ? 'node' : 'web',
        node: TARGET_NODE ? undefined : false,
        plugins: [
            TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
        ],
        externals: TARGET_NODE
            ? nodeExternals({
                  whitelist: /\.css$/
              })
            : undefined,
        output: {
            libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
        },
        optimization: {
            splitChunks: TARGET_NODE
                ? undefined
                : {
                      name: 'manifest',
                      minChunks: Infinity,
                      cacheGroups: {
                          vendors: {
                              name: `chunk-vendors`,
                              test: /[\\/]node_modules[\\/]/,
                              priority: -10,
                              chunks: 'initial'
                          },
                          common: {
                              name: `chunk-common`,
                              minChunks: 2,
                              priority: -20,
                              chunks: 'initial',
                              reuseExistingChunk: true
                          }
                      }
                  }
        },
        resolve: {
            alias: {
                'create-api': createApiFile
            }
        }
    }),
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options =>
                merge(options, {
                    optimizeSSR: false
                })
            )
    },

    // pages: {
    //     index: {
    //         // entry for the page
    //         entry: 'src/client.js',
    //         // the source template
    //         template: 'public/index.html',
    //         // output as dist/index.html
    //         filename: 'index.html'
    //     }
    // },
    css: {
        modules: true,
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                plugins: [
                    require('autoprefixer')(),
                    require('postcss-import')(),
                    require('postcss-aspect-ratio-mini')(),
                    require('postcss-write-svg')({
                        utf8: false
                    }),
                    require('postcss-px-to-viewport')({
                        viewportWidth: 750,
                        viewportHeight: 1334,
                        unitPrecision: 3,
                        viewportUnit: 'vw',
                        selectorBlackList: [
                            '.ignore',
                            '.hairlines',
                            '.c4',
                            'c4'
                        ],
                        minPixelValue: 1,
                        mediaQuery: false
                    }),
                    require('postcss-assets')(),
                    require('postcss-sprites')({
                        // stylesheetPath: './',
                        verbose: true,
                        spritePath: './public/img/', //雪碧图合并后存放地址
                        basePath: './',
                        retina: true,
                        outputDimensions: true
                    }),
                    require('postcss-preset-env')(),
                    require('postcss-bem')({ style: 'bem' }),
                    require('postcss-nested')()
                ]
                // options here will be passed to postcss-loader
            }
        }
    }
}
