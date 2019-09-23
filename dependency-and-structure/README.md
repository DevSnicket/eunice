# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice/master/arrows/default-height.svg?sanitize=true) Dependency and structure

This package takes YAML that contains dependencies and structure, represented as objects and does the following:
* Standardizes structure (to support varying YAML verbosity)
* Replaces the identifiers of whats depended upon with object references
* Adds dependent object references (so dependencies are available in both directions)

It is used by the renderer and some of the processors of Eunice.

More information can be found in the [Eunice repository](https://github.com/DevSnicket/Eunice#readme) on GitHub.

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-dependency-and-structure.svg)](https://www.npmjs.com/package/@devsnicket/eunice-dependency-and-structure
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-dependency-and-structure.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-dependency-and-structure) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-dependency-and-structure/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-dependency-and-structure?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-dependency-and-structure):

```bash
npm install @devsnicket/eunice-dependency-and-structure
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-dependency-and-structure):

```bash
yarn add @devsnicket/eunice-dependency-and-structure
```

## YAML

* YAML is read using the function createStackFromYaml and written using createYamlFromStack.
* Parsing and formatting of YAML is not included in this package. Javascript objects are expected for the parameter of createStackFromYaml and will be returned by createYamlFromStack. These objects are expected to be in a form that matches the [js-yaml](https://github.com/nodeca/js-yaml) package.
* The YAML content supported is specified [in the main Eunice repository](https://github.com/DevSnicket/Eunice/blob/master/docs/yaml.md). Any additional content will be preserved when reading and writing.

## Stacks

After a stack has been read/created from YAML using createStackFromYaml (see above), the following functions can be used on the stack or sub-stacks:

### findDirectionBetweenItemsInFirstMutualStack

This function takes two stacks as parameters, works up the hierarchical structure from those stacks, finds the first ancestor stack that both stacks specified are descendants of, and returns that mutual ancestor stack and what the direction is between the "from" and "to" stacks specified.

### findItemInStackWithIdentifierHierarchy

This function takes a stack and an array of item identifiers as parameters, it will then work its way down the hierarchical structure of the stack specified, looking for an item that matches the identifier specified at that index and returns the item that matches the last identifier specified. If at any point during this process there are no child items or an child item can't be found with a matching identifier, an error is thrown.

### isInnerStack

This function takes two stacks as parameters, navigates up the hierarchical structure and returns true if "target" stack specified is an ancestor of the "source" stack specified.
