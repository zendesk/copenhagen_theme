export const config = {
  sass: {
    input: {
      path: './src/sass',
      file: 'style.scss'
    },
    output: {
      path: './dist',
      file: 'style.css'
    }
  },

  scripts: {
    input: {
      path: './src/js',
      file: 'script.js'
    },
    output: {
      path: './dist',
      file: 'script.js'
    }
  },

  assets: {
    input: {
      path: './src/assets'
    },
    output: {
      path: './dist/assets'
    }
  },

  templates: {
    input: {
      path: './src/templates'
    },
    output: {
      path: './dist/templates'
    }
  },

  settings: {
    input: {
      path: './src/settings'
    },
    output: {
      path: './dist/settings'
    }
  },

  zendesk: {
    manifest: './dist/manifest.json'
  }
};
