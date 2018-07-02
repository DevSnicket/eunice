# Eunice

[![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/Eunice) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/Eunice/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/Eunice?branch=master)

Eunice is a system of utilities based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. It doesn't constrain this idea to direct dependencies, but includes indirect dependencies as well.

[try it out](https://devsnicket.github.io/Eunice-harnesses/harness.html)

### Stacks

Part of how this is achieved in Eunice is by defining stacks. When an item should depend upon another it is placed above the other in their stack. When items are independent of each other they can be placed at the same level in their stack.

### Scale

This approach can be applied at all scales of software and across boundaries, from individual files, functions or classes, to multiple, large codebases in different languages, frameworks and runtimes.

### YAML

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

### Analyzers

Analyzers are implemented to create the YAML files, which can then be optionally post-processed and combined. Currently in development is a single file JavaScript analyzer.

### Renderer

To visualise what's in the YAML files and statistically measure how well they match the intended structure a SVG renderer has been implemented. The renderer doesn't use lines between items to show dependencies and instead marks items with counts for each dependency type:

- matches stack (green down arrow)
- does not match stack (red up arrow) 
- is not independent (red horizontal arrow).

[![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/arrows.svg?sanitize=true)](Renderer/tests/arrows.svg)

Dependency counts appear for both sides of the dependency, the dependent item and the item depended upon.

When there are multiple counts a summary of all counts is rendered at the bottom. Dependencies within an item are also summarised and are rendered below the item's identifer text.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
upper depends<br/>upon lower | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/stack/upper-depends-upon-lower/.svg?sanitize=true)](Renderer/tests/stack/upper-depends-upon-lower/.svg) | lower depends<br/>upon upper | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/stack/lower-depends-upon-upper/.svg?sanitize=true)](Renderer/tests/stack/lower-depends-upon-upper/.svg) | interdependent<br/>(stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/stack/two-interdependent/.svg?sanitize=true)](Renderer/tests/stack/two-interdependent/.svg)
independent | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/two/.svg?sanitize=true)](Renderer/tests/two/.svg) | first depends<br/>upon second | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/independency/first-depends-upon-second/.svg?sanitize=true)](Renderer/tests/independency/first-depends-upon-second/.svg) | interdependent<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/independency/two-interdependent/.svg?sanitize=true)](Renderer/tests/independency/two-interdependent/.svg)
parent depends<br />upon item | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/parent-depends-upon-item/.svg?sanitize=true)](Renderer/tests/parent-depends-upon-item/.svg) | item depends<br />upon parent | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/item-depends-upon-parent/.svg?sanitize=true)](Renderer/tests/item-depends-upon-parent/.svg) | first item<br/> depends upon<br/>second item<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/tests/independency/first-item-depends-upon-second-item/.svg?sanitize=true)](Renderer/tests/independency/first-item-depends-upon-second-item/.svg)
