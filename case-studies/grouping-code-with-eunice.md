As software gets more complicated we need ways to structure code to make it easier to understand. For example, functions, classes, closures, files, directories, repositories, namespaces, packages and services. However, how code is grouped in these structures doesn't always fit well with how the pieces work together.

[Eunice](https://devsnicket.com/eunice) is designed to help explore and define the structure of code with an awareness of its dependencies.

![](../arrows/default-height.svg)

This post is a follow up to an earlier case study that investigated and demonstrated the capabilities of Eunice, by using Eunice on the JavaScript library React:

["Analyzing the architecture of React, its structure and dependencies, with Eunice"](https://dev.to/grahamdyson/analyzing-the-architecture-of-react-its-structure-and-dependencies-with-eunice-1h8c)

In React the most significant scope of structure seems to be the [packages sub-directory](https://github.com/facebook/react/tree/master/packages) in the root of its repository. By the end of the case study I'd defined a potential stack for packages based on the existing directory structure and the dependencies shown by Eunice. However, this structure and its dependency counts didn't look particularly straightforward:

![](./11-individual-file-stack-packages.png)

The packages directory has enough items and levels that it can be hard to remember what all the dependency relationships are. This can be improved by grouping items that share concepts and dependency relationships.

The six sub-directories highlighted below all relate to devtools, have dependency counts that don't require their distribution across the stack and so could be grouped:

![](./12-devtools-highlighted.png)

To investigate how this might look the Eunice stack file in the packages directory can be modified. I've added a new item named react-devtools-group and moved the six related items inside it:

```
- - existing
- - id: react-devtools-group
    dependencyPermeable: true
    items:
      - [ react-devtools, react-devtools-shell ]
      - [ react-devtools-core, react-devtools-inline ]
      - - react-devtools-extensions
      - - react-devtools-shared
- [ react-art, react-interactions, react-refresh ]
- - react-test-renderer
- [ react-dom, react-native-renderer, react-noop-renderer ]
- [ legacy-events, react-reconciler ]
- [ create-subscription, jest-mock-scheduler, jest-react, react-cache, react-is, react-stream, use-subscription ]
- [ babel-plugin-react-jsx, eslint-plugin-react-hooks, react, react-debug-tools, scheduler, shared ]
```

I've marked the new item in the YAML as dependencyPermeable so that Eunice's dependency resolution will look inside it even though it won't be specified in the code's import statement paths.

Re-running the analysis and reloading the web page shows that this makes the packages directory stack simpler without adding any mismatching dependencies:

![](./13-devtools-group.png)

Selecting the new react-devtools-group shows its stack:

![](./14-devtools-group-contents.png)

To make this grouping more permanent and obvious, the Eunice stack above could be replaced with a new sub-directory in the code.

The example above was an obvious group to create, with the shared concept (devtools) already defined, high cohesion within its items and a simple relationship with the rest of the system. To get the same effect elsewhere, more detailed work might be required, directly in the code, moving small pieces around from across many parts of a system. Hopefully Eunice would still be useful even when whats required is more laborious.

Find out more at https://devsnicket.com/eunice.