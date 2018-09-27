# Eunice

[![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/Eunice) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/Eunice/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/Eunice?branch=master)

Eunice is a system of utilities based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. It doesn't constrain this idea to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice-harnesses/Renderer/harness.html) ([created with](dogfooding/generate.sh))

## Stacks

Part of how this is achieved in Eunice is by defining stacks. When an item should depend upon another it is placed above the other in their stack. When items are independent of each other they can be placed at the same level in their stack.

## Scale

This approach can be applied at all scales of software and across boundaries, from individual files, functions or classes, to multiple, large codebases in different languages, frameworks and runtimes.

## YAML

To support different sources of structure and dependency a common data format is defined in YAML.

``` YAML
- id: upper
  dependsUpon: lower left
  items:
  - id: nested
    dependsUpon: lower right
-
  - lower left
  - lower right
```

## Analyzers

Analyzers are implemented to create the YAML files, one is currently in development for JavaScript analyzer.

>[try out JavaScript &rightarrow; YAML](https://devsnicket.github.io/Eunice-harnesses/Analyzers/JavaScript/harness.html)

### Processors

The YAML files can then be optionally post-processed including combining the output of different analyzers. Currently there are processors written in JavaScript to:
- [group items by their identifier](Processors/groupItemsByIdentifierSeparator)
- order items by
	- [identifier](Processors/orderItemsByIdentifier)
	- index of
		- [ identifier suffix](Processors/orderItemsBy/indexOf/identifierSuffix)
		- [ type ](Processors/orderItemsBy/indexOf/type)
- [remove suffixes from identifiers](Processors/removeIdentifierSuffix)
- [sets the type of root items](Processors/setTypeOfRootItems)
- [stack root items](Processors/stackRootItems)
- [unstack independent items](Processors/unstackIndependent)

## Renderer

To visualise what's in the YAML files and statistically measure how well they match the intended structure a SVG renderer has been implemented. The renderer doesn't use lines between items to show dependencies and instead marks items with counts for each dependency type:

- matches stack (green down arrow)
- does not match stack (red up arrow) 
- is not independent (red horizontal arrow).

[![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgElementForYaml/createArrows.testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows.testcase.svg)

Dependency counts appear for both sides of the dependency, the dependent item and the item depended upon. When there are multiple counts a summary of all counts is rendered at the bottom. <sup>[1]</sup>.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
upper depends<br/>upon lower | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/stack/upper-depends-upon-lower/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/stack/upper-depends-upon-lower/.svg) | lower depends<br/>upon upper | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/stack/lower-depends-upon-upper/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/stack/lower-depends-upon-upper/.svg) | interdependent<br/>(stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/stack/two-interdependent/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/stack/two-interdependent/.svg)
independent | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/two/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/two/.svg) | first depends<br/>upon second | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/independency/first-depends-upon-second/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/independency/first-depends-upon-second/.svg) | interdependent<br/>(not stacked)<sup>[1]</sup> | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/independency/two-interdependent/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/independency/two-interdependent/.svg)

Dependencies within an item are also summarised and rendered inside the item box, below the identifer text.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
parent depends<br />upon item | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/parent-depends-upon-item/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/parent-depends-upon-item/.svg) | item depends<br />upon parent | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/item-depends-upon-parent/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/item-depends-upon-parent/.svg) | first item<br/> depends upon<br/>second item<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/independency/first-item-depends-upon-second-item/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/independency/first-item-depends-upon-second-item/.svg)

Items and sub-item can also be opened by clicking/tapping on their box. Opening an item will show its contents and breadcrumb links for where it is in the hierarchy.

root > grandparent

[![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/withSubset.testcases/upper-item-depends-upon-lower-item-with-parent.svg?sanitize=true)](Renderer/getSvgForYaml/withSubset.testcases/upper-item-depends-upon-lower-item-with-parent.svg) 

>[try out JavaScript &rightarrow; YAML &rightarrow; SVG](https://devsnicket.github.io/Eunice-harnesses/harness.html)
