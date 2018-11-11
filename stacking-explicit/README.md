# Eunice [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

[![Build Status](https://travis-ci.org/DevSnicket/eunice-processors.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-processors) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-processors/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-processors?branch=master)

## Processors

This package contains multiple processors that input and output dependencies defined in YAML. The input can be created by an analyzer or the output from another processor. After final processing the output can be rendered and interacted with. A JavaScript analyzer and SVG/web renderer are included elsewhere in [Eunice](https://www.github.com/DevSnicket/Eunice).

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-processors.svg)](https://www.npmjs.com/package/@devsnicket/eunice-processors
)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-processors):

```bash
npm install --save-dev @devsnicket/eunice-processors
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-processors):

```bash
yarn add --dev @devsnicket/eunice-processors
```

Currently there are processors written in JavaScript to:
- create or add to stacks
	- [applied uniformly](createOrAddToStacks/uniformly.js)
	- [to items with an identifier](createOrAddToStacks/toItemsWithIdentifier)*
	- [using the file system (.devsnicket-eunice-stack.yaml)](createOrAddToStacks/usingFileSystem)*
- [concatenate multiple sources of analysis from the file system](concatenateFromFileSystem)*
- [group items by their identifier](groupItemsByIdentifierSeparator)
- order items by
	- [identifier](orderItemsBy/identifier)
	- index of
		- [identifier suffix](orderItemsBy/indexOf/identifierSuffix)
		- [type](orderItemsBy/indexOf/type)
- [remove redundant prefix of parent identifier and separator](removeRedundantParentIdentifierPrefix)
- [remove self dependent items of a type](removeSelfDependentItemsOfType)
- [replace identifiers using a regular expression](replaceIdentifiers)
- [sets the type of root items](setTypeOfRootItems)
- [unstack independent items](unstackIndependent)

(\* not available in test harnesses)