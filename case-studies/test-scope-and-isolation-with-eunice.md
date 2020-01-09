There are often debates on the best way to describe what constitutes a "unit" when unit testing. Considering the scope of tests is an important part of code structure and complementary to how the implementation is grouped.

Structure is one aspect of software, there must also be dependencies. Dependencies still exist even when clarified with contracts (e.g. APIs, interface types) or are inverted (e.g. plug-ins, dependency injection). However, implementation practices such as these can be helpful to improve test scope and isolation.

Specifically when testing, issues with scope and isolation can lead to tests with lots of setup (e.g. mocking) and discrepancies between where implementation was changed and what tests were affected by those changes.

[Eunice](https://devsnicket.com/eunice) is designed to bring together the concepts of scope and isolation, through the wider concepts of structure and dependency. It does this by encouraging uni-directional dependencies instead of bi-directional; this includes indirect dependencies.

![](../arrows/default-height.svg)

This post is a 2nd follow up to an earlier case study that investigated and demonstrated the capabilities of Eunice, by using Eunice on the source code of the JavaScript library React:

> ["Analyzing the architecture of React, its structure and dependencies, with Eunice"](https://dev.to/grahamdyson/analyzing-the-architecture-of-react-its-structure-and-dependencies-with-eunice-1h8c)

> ["Grouping code with Eunice"](https://dev.to/grahamdyson/grouping-code-with-eunice-2c63)

In React the most significant scope of structure seems to be the [packages directory](https://github.com/facebook/react/tree/master/packages) in the root of its repository. By the end of the case study and the 1st follow up, after looking at the dependencies shown by Eunice, I'd defined a potential stack for the packages directory, this included a new group for devtools. There were still some mismatching dependencies (red up arrows), at the packages scope (arrows outside the grey sub-directory boxes):

![](./13-devtools-group.png)

While looking through React's code I noticed some of the package scoped bi-directional dependencies were only in its tests. This can be investigated by modifying the ignore path pattern to exclude test related directories:

```bash
npx eunice \
--ignore-path-pattern="(^(\.|babel.config.js|scripts|fixtures)|node_modules|__tests__)" \
--modify-stacks-file=.eunice-stack-modify.yaml \
--is-file-content-reversed=true \
--babel-parser-plugins=classPrivateProperties \
--babel-parser-plugins=classProperties \
--babel-parser-plugins=dynamicImport \
--babel-parser-plugins=flow \
--babel-parser-plugins=jsx
```

Re-running the analysis and reloading the web page shows that with tests ignored, the number of sub-directories with no bi-directional dependencies at the package scope has improved. Note that Eunice has detected that react-test-renderer no longer needs to be stacked in a separate level and so has automatically moved it up into the level above:

![](./15-ignore-tests.png)

The remaining red mismatching dependency arrows across packages are from react-flight and react-server onto react-dom. Modifying the packages directory stack can, for the first time, get all the package scoped dependencies uni-directional. This can be done by moving react-flight and react-server below react-dom:

```yaml
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
- [ legacy-events, react-flight, react-reconciler, react-server ]
- [ create-subscription, jest-mock-scheduler, jest-react, react-cache, react-is, react-stream, use-subscription ]
- [ babel-plugin-react-jsx, eslint-plugin-react-hooks, react, react-debug-tools, scheduler, shared ]
```

We can now see in Eunice that the only dependencies across the packages sub-directories are those from tests, as there are no package scoped mismatching red arrows:

![](./16-ignore-tests-specific-stack.png)

Ignoring tests in Eunice has shown a potential uni-directional structure that might work for the implementation. However, ideally and more permanently the tests could be updated in React's code to match such a structure and so be represented in the analysis with importance equal to that of the implementation.

Find out more at https://devsnicket.com/eunice