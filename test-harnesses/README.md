# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Test harnesses

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice)

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-test-harnesses.svg)](https://www.npmjs.com/package/@devsnicket/eunice-test-harnesses
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-test-harnesses.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-test-harnesses) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package contains implementation shared between both the [JavaScript analyzer test harnesses](https://github.com/DevSnicket/eunice-javascript-analyzer/tree/master/harness) and [renderer test harnesses](https://github.com/DevSnicket/eunice-renderer-test-harness) of [Eunice](https://github.com/DevSnicket/Eunice). The test harnesses use JavaScript, CSS, HTML, [React](https://reactjs.org/), [Webpack](https://webpack.js.org/), [VS Code's Monaco editor](https://github.com/microsoft/monaco-editor) and the [React Re-F|ex](https://github.com/leefsmp/Re-Flex) component.

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
