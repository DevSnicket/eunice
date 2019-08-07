# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Renderer

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice) ([created with](dogfooding/generate.sh))

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-renderer.svg)](https://www.npmjs.com/package/@devsnicket/eunice-renderer
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-renderer.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-renderer) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-renderer/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-renderer?branch=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package reads dependencies and structure, defined as YAML, and renders them as SVG. The structure can include [stacks](https://github.com/DevSnicket/eunice#stacks) that are [scoped/grouped](https://github.com/DevSnicket/eunice#scopes--groups) into a hierarchy. Dependencies of each item are counted and totals are rendered with the item. Item's can have multiple totals, separated by whether the dependencies counted either match or do not match their stack.

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-renderer):

```bash
npm install --save-dev @devsnicket/eunice-renderer
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-renderer):

```bash
yarn add --dev @devsnicket/eunice-renderer
```

Instead of rendering dependencies as lines between items each dependency is counted into the following categories:

![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/with-descriptions.svg?sanitize=true)

- matches stack (green down arrow)
- does not match stack (red up arrow)
- is not independent (red horizontal arrow)

Dependency counts appear for both sides of the dependency, the dependent item and the item depended upon. When there are multiple counts a summary of all counts is rendered at the bottom.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
upper depends<br/>upon lower | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/stack/upper-depends-upon-lower/.svg?sanitize=true)](getSvgForYaml/testCases/stack/upper-depends-upon-lower/.svg) | lower depends<br/>upon upper | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/stack/lower-depends-upon-upper/.svg?sanitize=true)](getSvgForYaml/testCases/stack/lower-depends-upon-upper/.svg) | interdependent<br/>(stacked) | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/stack/two-interdependent/.svg?sanitize=true)](getSvgForYaml/testCases/stack/two-interdependent/.svg)
independent | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/two/.svg?sanitize=true)](getSvgForYaml/testCases/two/.svg) | first depends<br/>upon second | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/independency/first-depends-upon-second/.svg?sanitize=true)](getSvgForYaml/testCases/independency/first-depends-upon-second/.svg) | interdependent<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/independency/two-interdependent/.svg?sanitize=true)](getSvgForYaml/testCases/independency/two-interdependent/.svg)

Dependencies within an item are also summarized and rendered inside the item box, below the identifer text.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
parent depends<br />upon item | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/parent-depends-upon-item/.svg?sanitize=true)](getSvgForYaml/testCases/parent-depends-upon-item/.svg) | item depends<br />upon parent | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/item-depends-upon-parent/.svg?sanitize=true)](getSvgForYaml/testCases/item-depends-upon-parent/.svg) | first item<br/> depends upon<br/>second item<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/independency/first-item-depends-upon-second-item/.svg?sanitize=true)](getSvgForYaml/testCases/independency/first-item-depends-upon-second-item/.svg)

Items and sub-item can also be opened. Opening an item will show its contents and breadcrumb links for where it is in the hierarchy.

root > grandparent

[![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/withSubset.testCases/upper-item-depends-upon-lower-item-with-parent.svg?sanitize=true)](getSvgForYaml/withSubset.testCases/upper-item-depends-upon-lower-item-with-parent.svg)
