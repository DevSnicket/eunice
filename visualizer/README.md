# Eunice [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/testCase.svg?sanitize=true)](Renderer/getSvgElementForStack/createArrows/testcase.svg)

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice/renderer/harness.html) ([created with](dogfooding/generate.sh))

## Renderer

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-renderer.svg)](https://www.npmjs.com/package/@devsnicket/eunice-renderer
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-renderer.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-renderer) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-renderer/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-renderer?branch=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

[Eunice](https://www.github.com/DevSnicket/Eunice) includes a YAML file format to store dependency and structure, it also includes analyzers to produce this YAML and processors of the YAML.

To visualize and explore what's in the YAML files, and to statistically measure how well they match the intended structure, a SVG renderer has been implemented in Javascript. The renderer doesn't use lines between items to show dependencies and instead marks items with counts for each dependency type:

- matches stack (green down arrow)
- does not match stack (red up arrow) 
- is not independent (red horizontal arrow).

[![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForStack/createArrows/testcase.svg)

Dependency counts appear for both sides of the dependency, the dependent item and the item depended upon. When there are multiple counts a summary of all counts is rendered at the bottom. <sup>[1]</sup>.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
upper depends<br/>upon lower | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/stack/upper-depends-upon-lower/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/stack/upper-depends-upon-lower/.svg) | lower depends<br/>upon upper | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/stack/lower-depends-upon-upper/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/stack/lower-depends-upon-upper/.svg) | interdependent<br/>(stacked) | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/stack/two-interdependent/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/stack/two-interdependent/.svg)
independent | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/two/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/two/.svg) | first depends<br/>upon second | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/independency/first-depends-upon-second/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/independency/first-depends-upon-second/.svg) | interdependent<br/>(not stacked)<sup>[1]</sup> | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/independency/two-interdependent/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/independency/two-interdependent/.svg)

Dependencies within an item are also summarized and rendered inside the item box, below the identifer text.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
parent depends<br />upon item | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/parent-depends-upon-item/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/parent-depends-upon-item/.svg) | item depends<br />upon parent | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/item-depends-upon-parent/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/item-depends-upon-parent/.svg) | first item<br/> depends upon<br/>second item<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/testCases/independency/first-item-depends-upon-second-item/.svg?sanitize=true)](Renderer/getSvgForYaml/testCases/independency/first-item-depends-upon-second-item/.svg)

Items and sub-item can also be opened by clicking/tapping on their box. Opening an item will show its contents and breadcrumb links for where it is in the hierarchy.

root > grandparent

[![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgForYaml/withSubset.testCases/upper-item-depends-upon-lower-item-with-parent.svg?sanitize=true)](Renderer/getSvgForYaml/withSubset.testCases/upper-item-depends-upon-lower-item-with-parent.svg)

>[try out JavaScript &rightarrow; YAML &rightarrow; SVG](https://devsnicket.github.io/Eunice/javascript-analyzer-and-renderer/harness.html)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-renderer):

```bash
npm install --save-dev @devsnicket/eunice-renderer
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-renderer):

```bash
yarn add --dev @devsnicket/eunice-renderer
```
