const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
            '@primary-color': "#e3bd9b"
          },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};