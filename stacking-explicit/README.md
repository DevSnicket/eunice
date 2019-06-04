# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Processors

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice)

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-processors.svg)](https://www.npmjs.com/package/@devsnicket/eunice-processors
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-processors.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-processors) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-processors/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-processors?branch=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package contains multiple processors that input and output dependencies defined in YAML. The input can be created by an analyzer or the output from another processor. After final processing the output can be rendered and interacted with. A JavaScript analyzer and SVG/web renderer are included elsewhere in [Eunice](https://www.github.com/DevSnicket/Eunice).

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
	- [applied uniformly](stacking/createOrAddToStacksUniformly)
	- [to items with an identifier](stacking/createOrAddToStacksToItemsWithIdentifier)*
	- [using the file system (.devsnicket-eunice-stack.yaml)](stacking/createOrAddToStacksUsingFileSystem)*
- [concatenate multiple sources of analysis from the file system](concatenateFromFileSystem)*
- [group items by their identifier](groupItemsByIdentifierSeparator)
- order items by
	- [identifier](sorting/orderItemsByIdentifier)
	- index of
		- [identifier suffix](sorting/orderItemsByIndexOfIdentifierSuffix)
		- [type](sorting/orderItemsByIndexOfType)
- [remove redundant prefix of parent identifier and separator](removeRedundantParentIdentifierPrefix)
- [remove self dependent items of a type](removeSelfDependentItemsOfType)
- [replace identifiers using a regular expression](replaceIdentifiers)
- [sets the identifier of anonymous items to the parent identifier](setIdentifierOfAnonymousToParent)
- [sets the type of root items](setTypeOfRootItems)
- [unstack independent items](unstackIndependent)

(\* not available in test harnesses)
