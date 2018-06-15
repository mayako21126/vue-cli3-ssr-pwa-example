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
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                plugins: [
                    require('autoprefixer')(),
                    require('postcss-preset-env')()
                ]
                // options here will be passed to postcss-loader
            }
        }
    }
}
