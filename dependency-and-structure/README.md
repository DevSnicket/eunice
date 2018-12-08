# Eunice [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Euince's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice-harnesses/Renderer/harness.html) ([created with](dogfooding/generate.sh))

## Dependency and structure

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-dependency-and-structure.svg)](https://www.npmjs.com/package/@devsnicket/eunice-dependency-and-structure
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-dependency-and-structure.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-dependency-and-structure) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-dependency-and-structure/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-dependency-and-structure?branch=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package takes YAML objects, replaces the identifiers of whats depended upon with references, adds dependent references in other direction and normalises the hierarchical structure.

It is written to use YAML objects parsed and formatted by [js-yaml](https://github.com/nodeca/js-yaml).

Used by the renderer and some of the processors in [Eunice](https://github.com/DevSnicket/Eunice).

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-dependency-and-structure):

```bash
npm install @devsnicket/eunice-dependency-and-structure
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-dependency-and-structure):

```bash
yarn add @devsnicket/eunice-dependency-and-structure
```
