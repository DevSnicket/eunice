# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice/gh-pages/arrows/default-height.svg?sanitize=true) Test harnesses

This package contains implementation shared between both the [JavaScript analyzer test harnesses](https://github.com/DevSnicket/eunice-javascript-analyzer/tree/master/harness) and [renderer test harnesses](https://github.com/DevSnicket/eunice-renderer-test-harness) of Eunice. The test harnesses use JavaScript, CSS, HTML, [React](https://reactjs.org/), [Webpack](https://webpack.js.org/), [VS Code's Monaco editor](https://github.com/microsoft/monaco-editor) and the [React Re-F|ex](https://github.com/leefsmp/Re-Flex) component.

More information can be found in the [Eunice repository](https://github.com/DevSnicket/Eunice#readme) on GitHub.

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-test-harnesses.svg)](https://www.npmjs.com/package/@devsnicket/eunice-test-harnesses
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-test-harnesses.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-test-harnesses) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-test-harnesses):

```bash
npm install --save-dev @devsnicket/eunice-test-harnesses
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-test-harnesses):

```bash
yarn add --dev @devsnicket/eunice-test-harnesses
```

## Processor plug-ins

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-test-harnesses-processor-plugins.svg)](https://www.npmjs.com/package/@devsnicket/eunice-test-harnesses-processor-plugins
)

This repository also contains a processor plug-ins package that allows processors to be used from the analyzer test harness without depending upon it. The plug-in relationship across packages is implemented using [plugin-discovery](https://github.com/DevSnicket/plugin-discovery) packages.
