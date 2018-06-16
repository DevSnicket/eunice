# Eunice

Eunice is a system of utilities based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. It doesn't constrain this idea to direct dependencies, but includes indirect dependencies as well.

Part of how this is achieved in Eunice is by defining stacks. When an item should depend upon another it is placed above the other in their stack. When items are independent of each other they can be placed at the same level in their stack.

This approach can be applied at all scales of software and across boundaries, from individual files, functions or classes, to multiple, large codebases in different languages, frameworks and runtimes.

To support different sources of structure and dependency a common data format is defined in YAML. Generators are implemented to create the YAML files, which can then be optionally post-processed and combined. Currently in development is a single file JavaScript analyser.
