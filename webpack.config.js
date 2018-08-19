module.exports = {
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    path: '/Users/okonomi/src/github.com/okonomi/esabako/public/packs',
    publicPath: '/packs/',
    pathinfo: true,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.sass',
      '.scss',
      '.css',
      '.module.sass',
      '.module.scss',
      '.module.css',
      '.png',
      '.svg',
      '.gif',
      '.jpeg',
      '.jpg',
    ],
    modules: [
      '/Users/okonomi/src/github.com/okonomi/esabako/app/javascript',
      'node_modules',
    ],
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'none',
    contentBase: '/Users/okonomi/src/github.com/okonomi/esabako/public/packs',
    publicPath: '/packs/',
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: {
      errorDetails: true,
    },
  },
  entry: {
    application:
      '/Users/okonomi/src/github.com/okonomi/esabako/app/javascript/packs/application.jsx',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: {},
        exclude: {},
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: 'tmp/cache/webpacker/babel-loader',
            },
          },
        ],
      },
      {
        test: {},
        use: [
          {
            loader:
              '/Users/okonomi/src/github.com/okonomi/esabako/node_modules/extract-text-webpack-plugin/dist/loader.js',
            options: {
              omit: 1,
              remove: true,
            },
          },
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: true,
              importLoaders: 2,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path:
                  '/Users/okonomi/src/github.com/okonomi/esabako/.postcssrc.yml',
              },
            },
          },
        ],
        exclude: {},
      },
      {
        test: {},
        use: [
          {
            loader:
              '/Users/okonomi/src/github.com/okonomi/esabako/node_modules/extract-text-webpack-plugin/dist/loader.js',
            options: {
              omit: 1,
              remove: true,
            },
          },
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: true,
              importLoaders: 2,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path:
                  '/Users/okonomi/src/github.com/okonomi/esabako/.postcssrc.yml',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: {},
      },
      {
        test: {},
        use: [
          {
            loader:
              '/Users/okonomi/src/github.com/okonomi/esabako/node_modules/extract-text-webpack-plugin/dist/loader.js',
            options: {
              omit: 1,
              remove: true,
            },
          },
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: true,
              importLoaders: 2,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path:
                  '/Users/okonomi/src/github.com/okonomi/esabako/.postcssrc.yml',
              },
            },
          },
        ],
        include: {},
      },
      {
        test: {},
        use: [
          {
            loader:
              '/Users/okonomi/src/github.com/okonomi/esabako/node_modules/extract-text-webpack-plugin/dist/loader.js',
            options: {
              omit: 1,
              remove: true,
            },
          },
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: true,
              importLoaders: 2,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path:
                  '/Users/okonomi/src/github.com/okonomi/esabako/.postcssrc.yml',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        include: {},
      },
      {
        test: {},
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              context: 'app/javascript',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    {
      keys: [
        'TERM_PROGRAM',
        'NODENV_SHELL',
        'NODENV_DIR',
        'TERM',
        'SHELL',
        'TMPDIR',
        'Apple_PubSub_Socket_Render',
        'TERM_PROGRAM_VERSION',
        'TERM_SESSION_ID',
        'NODENV_ROOT',
        'NODENV_HOOK_PATH',
        'USER',
        'RBENV_ROOT',
        'SSH_AUTH_SOCK',
        '__CF_USER_TEXT_ENCODING',
        'PATH',
        'PWD',
        'LANG',
        'ITERM_PROFILE',
        'XPC_FLAGS',
        'RBENV_SHELL',
        'XPC_SERVICE_NAME',
        'SHLVL',
        'HOME',
        'COLORFGBG',
        'ITERM_SESSION_ID',
        'LOGNAME',
        'NODENV_VERSION',
        'DISPLAY',
        'COLORTERM',
        'NODE_ENV',
      ],
      defaultValues: {
        TERM_PROGRAM: 'iTerm.app',
        NODENV_SHELL: 'fish',
        NODENV_DIR: '/Users/okonomi/src/github.com/okonomi/esabako',
        TERM: 'xterm-256color',
        SHELL: '/usr/local/bin/fish',
        TMPDIR: '/var/folders/9f/rrsjdmp5601g543l939nrl700000gn/T/',
        Apple_PubSub_Socket_Render:
          '/private/tmp/com.apple.launchd.PHhIgd5X6F/Render',
        TERM_PROGRAM_VERSION: '3.1.7',
        TERM_SESSION_ID: 'w0t0p0:EC0D6039-EAAC-40A2-A875-176665FB4B2C',
        NODENV_ROOT: '/Users/okonomi/.anyenv/envs/nodenv',
        NODENV_HOOK_PATH:
          '/Users/okonomi/.anyenv/envs/nodenv/nodenv.d:/usr/local/etc/nodenv.d:/etc/nodenv.d:/usr/lib/nodenv/hooks:/Users/okonomi/.anyenv/envs/nodenv/plugins/nodenv-default-packages/etc/nodenv.d:/Users/okonomi/.anyenv/envs/nodenv/plugins/nodenv-vars/etc/nodenv.d',
        USER: 'okonomi',
        RBENV_ROOT: '/Users/okonomi/.anyenv/envs/rbenv',
        SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.6b4OkPgm2e/Listeners',
        __CF_USER_TEXT_ENCODING: '0x1F5:0x1:0xE',
        PATH:
          '/Users/okonomi/.anyenv/envs/nodenv/versions/9.11.2/bin:/Users/okonomi/.anyenv/envs/nodenv/libexec:/Users/okonomi/.anyenv/envs/nodenv/plugins/nodenv-vars/bin:/Users/okonomi/.anyenv/envs/nodenv/plugins/nodenv-default-packages/bin:/Users/okonomi/.anyenv/envs/nodenv/plugins/node-build/bin:/Users/okonomi/.anyenv/envs/rbenv/shims:/Users/okonomi/.anyenv/envs/nodenv/shims:/Users/okonomi/.anyenv/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/local/share/dotnet:/Library/Frameworks/Mono.framework/Versions/Current/Commands:/Users/okonomi/.anyenv/envs/nodenv/bin:/Users/okonomi/.anyenv/envs/rbenv/bin',
        PWD: '/Users/okonomi/src/github.com/okonomi/esabako',
        LANG: 'ja_JP.UTF-8',
        ITERM_PROFILE: 'Default',
        XPC_FLAGS: '0x0',
        RBENV_SHELL: 'fish',
        XPC_SERVICE_NAME: '0',
        SHLVL: '1',
        HOME: '/Users/okonomi',
        COLORFGBG: '7;0',
        ITERM_SESSION_ID: 'w0t0p0:EC0D6039-EAAC-40A2-A875-176665FB4B2C',
        LOGNAME: 'okonomi',
        NODENV_VERSION: '9.11.2',
        DISPLAY:
          '/private/tmp/com.apple.launchd.lNVlmXKVrY/org.macosforge.xquartz:0',
        COLORTERM: 'truecolor',
        NODE_ENV: 'development',
      },
    },
    {
      options: {},
      pathCache: {},
      fsOperations: 0,
      primed: false,
    },
    {
      filename: '[name]-[contenthash].css',
      id: 1,
      options: {},
    },
    {
      opts: {
        basePath: '',
        publicPath: '/packs/',
        fileName: 'manifest.json',
        stripSrc: null,
        transformExtensions: {},
        writeToFileEmit: true,
        cache: null,
        seed: null,
        filter: null,
        map: null,
        reduce: null,
      },
    },
    {
      definitions: {
        $: 'jquery',
        jQuery: 'jquery',
        Popper: 'popper.js',
      },
    },
  ],
}
