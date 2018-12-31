# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

## YAML

To give Euince [composability](https://en.wikipedia.org/wiki/Composability) within and between stages, a common data format for structure and dependency is described using [YAML](https://yaml.org/).

The following specifies what is supported in Eunice YAML, but other mapping keys not specified can be included and should be preserved.

### Identifiers
An item identifier is specified with a [scalar](https://yaml.org/spec/1.2/spec.html#id2760844) or the value of [mapping](https://yaml.org/spec/1.2/spec.html#id2759963) key "id".
``` YAML
item 1
```
``` YAML
id: item 1
```
Identifiers need to be unique within at least the scope of a [sequence](https://yaml.org/spec/1.2/spec.html#id2759963) ([independent](#independent-items)) or sequence of sequences ([stack](#stacked-items)) so dependencies can be resolved unambigiously.
### Dependencies
Dependencies are specified in the value of [mapping](https://yaml.org/spec/1.2/spec.html#id2759963) key "dependsUpon".
``` YAML
id: item 1
dependsUpon: item 2
```
The value of "dependsUpon" can be a [sequence](https://yaml.org/spec/1.2/spec.html#id2759963) of multiple item identifiers.
``` YAML
id: item 1
dependsUpon: [item 2, item 3]
```
The value or [sequence](https://yaml.org/spec/1.2/spec.html#id2759963) of "dependsUpon" can also contain a [mapping](https://yaml.org/spec/1.2/spec.html#id2759963) with keys of id and items. This specifies a dependency on a [nested / child item](#nested--child-items).
``` YAML
id: item 1
dependsUpon:
  id: item 2
  items: child of item 2
```
### Independent items
A [sequence](https://yaml.org/spec/1.2/spec.html#id2759963) specifies items intended to be independent of each other.
``` YAML
[left item, right item]
```
### Stacked items
A [sequence](https://yaml.org/spec/1.2/spec.html#id2759963) of item sequences specifies a stack of items.
``` YAML
- [upper left item, upper right item]
- [lower left item, lower right item]
```
### Nested / child items
The value of [mapping](https://yaml.org/spec/1.2/spec.html#id2759963) key "items" is used to nest child items within an item.
``` YAML
id: parent item
items: child item
```
The value can be a [scalar](https://yaml.org/spec/1.2/spec.html#id2760844) identifier, a [mapping](https://yaml.org/spec/1.2/spec.html#id2759963) of key "id", a [sequence](https://yaml.org/spec/1.2/spec.html#id2759963) of independent items or a sequence of item sequences in a stack (the latter is shown below).
``` YAML
id: parent item
items:
  - [upper left child item, upper child right item]
  - [lower left child item, lower child right item]
```
