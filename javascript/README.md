# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Javascript

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice)

[try out Eunice on some Javascript](https://devsnicket.github.io/Eunice/javascript)

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice.svg)](https://www.npmjs.com/package/@devsnicket/eunice
) [![Build Status](https://dev.azure.com/grahamdyson/Eunice/_apis/build/status/grahamdyson.eunice-javascript?branchName=master)](https://dev.azure.com/grahamdyson/Eunice/_build/latest?definitionId=1&branchName=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package brings together JavaScript analysis, an example configuration to process that analysis and a render of the processed analysis. A description of how these stages work can be found [in the main Eunice repository](https://github.com/DevSnicket/Eunice#how-eunice-works).

To try the package out on JavaScript source code in the current directory the following [npx](https://www.npmjs.com/package/npx) command can be used:

```bash
npx eunice
```

The package produces the following output files:
* a YAML file containing processed analysis (eunice.yaml)
  
  (runs [JavaScript analyzer](https://github.com/DevSnicket/eunice-javascript-analyzer) and [processors](https://github.com/DevSnicket/eunice-processors))
* an SVG file containing a render scoped to the root directory (eunice.svg)
  
  (runs [renderer](https://github.com/DevSnicket/eunice-renderer))
* a HTML file containing an interactive render, where the scope can be set to sub-items (e.g. sub-directories, files, functions etc), and dependencies can be listed (eunice.html)
  
  (runs [renderer test harness](https://github.com/DevSnicket/eunice-renderer-test-harness))

Install and run using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice):

```bash
npm install --save-dev @devsnicket/eunice
npx eunice
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice):

```bash
yarn add --dev @devsnicket/eunice
yarn eunice
```

This GitHub repository is named eunice-javascript, but the NPM package contained is called just eunice. This stops the main eunice repository from being JavaScript specific (e.g. for multiple analysis sources and programming languages), but gives this package a shorter name. An additional package without the @devsnicket scope is also created that redirects to the scoped package.

## Processing
From the processors available in [eunice-processors](https://github.com/DevSnicket/eunice-processors
), this package runs the following automatically, the same processing as Eunice uses when analyzing itself:
1. The filename "index" is removed from identifiers.
2. Optionally ensure there is a single root item with an identifier (e.g. the package's name).
3. Items that are files have "type: file" added to them.
4. Items are ordered by their identifiers.
5. Items are grouped by their identifiers (this is requires the previous ordering step).
6. Anonymous items (i.e. those without an identifier) are given the identifier of their parent.
7. Variables that depend upon one item of the same name are removed (e.g. some CommonJS requires or ES6 imports).
8. Items are ordered so parameters, variables and files are last.
9. Any items with identifiers of "bin" and "test" are stacked in a level together above other items.
10. Items that have identifiers starting with "test" have child items for the [Jest](https://jestjs.io/) methods "expect" and "test" added together in a level below the other items.
11. Independent items (i.e. those that don't depend on each other) are unstacked into the same level.
12. The source directory is scanned for any files named .devsnicket-eunice-stack.yaml. Any structure defined inside these files is applied to any files also in the directory.
13. If there is a single root item, that is anonymous and has only items and type, its items are flattened out into the root

## Options
JavaScript files are expected to be ordered so that a function is after calls of it, this can be reversed with:
```bash
npx @devsnicket/eunice --isFileContentReversed=true
```

Only the current directory is included in analysis by default. Multiple sources of analysis can be specified:
```bash
npx @devsnicket/eunice --directories=directory1 --directories=directory2
```
An identifier for a root item can also be specified for each source directory to be used in [processing](#Processing) step 2:
```bash
npx @devsnicket/eunice --directories=directory1 --rootItemIdentifiers=prefixForDirectory1 --directories=directory2 --rootItemIdentifiers=prefixForDirectory2
```

The following sub-directories are ignored by default:
* .devsnicket-plugin-discovery
* .git
* .vscode
* dist
* node_modules
* output
* test-cases
* test-coverage

A regular expression of file and directory paths to be ignored can be specified:
```bash
npx @devsnicket/eunice --ignorePathPattern=(ignoreDirectory1|ignoreDirectory2)
```

Packages installed in the node_modules directory are not analysed by default. They can included using the "directories" option above or with:
```bash
npx @devsnicket/eunice --packageNames=package1 --packageNames=package2
```
To aid readability a package prefix and scope can also be specified that will not be visible in the rendered output:
```bash
// e.g. @scope/prefix-package
npx @devsnicket/eunice --packageNames=package --packagePrefix=prefix- --packageScope=scope
```

When multiple sources of analysis are specified, [processing](#Processing) step 12 can also be applied to the combined sources:
```bash
npx @devsnicket/eunice --directories=directory1 --directories=directory2 --directoryToCreateOrAddToStacksFrom=stacks-directory
```

To name the output files differently or in a different directory:
```bash
npx @devsnicket/eunice --outputBaseFileName=eunice-file --outputDirectoryPath=eunice-directory
```

The [Babel parser plugins](https://babeljs.io/docs/en/babel-parser#plugins) enabled by default are listed [here](babelParserPluginsDefault.js). To override:
```bash
npx @devsnicket/eunice --babelParserPlugins=flow --babelParserPlugins=jsx
```

## Dogfooding

Eunice is run on itself, using this package, in a form of [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food). A version of this exists in this package's [package.json](package.json) file in the script property named "dogfooding".