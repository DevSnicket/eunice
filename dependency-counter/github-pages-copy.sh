rm -f -rf gh-pages/arrows &&
cp -r getSvgElementForStack/createArrows/test/withUse/test-cases gh-pages/arrows &&
cp getSvgElementForStack/createArrows/test/symbols/test-cases/down-10x10-*.svg gh-pages/arrows &&
rm -f -rf gh-pages/examples &&
mkdir gh-pages/examples &&
mkdir gh-pages/examples/level &&
cp getSvgForYaml/test/test-cases/level/first-depends-upon-second/.svg gh-pages/examples/level/first-depends-upon-second.svg &&
cp getSvgForYaml/test/test-cases/level/first-item-depends-upon-second-item/.svg gh-pages/examples/level/first-item-depends-upon-second-item.svg &&
cp getSvgForYaml/test/test-cases/level/two-interdependent/.svg gh-pages/examples/level/two-interdependent.svg &&
cp getSvgForYaml/test/test-cases/depends-upon-parent/.svg gh-pages/examples/item-depends-upon-parent.svg &&
cp getSvgForYaml/test/test-cases/parent-depends-upon-item/.svg gh-pages/examples/parent-depends-upon-item.svg &&
mkdir gh-pages/examples/stack &&
cp getSvgForYaml/test/test-cases/stack/lower-depends-upon-upper/.svg gh-pages/examples/stack/lower-depends-upon-upper.svg &&
cp getSvgForYaml/test/test-cases/stack/two-interdependent/.svg gh-pages/examples/stack/two-interdependent.svg &&
cp getSvgForYaml/test/test-cases/stack/upper-depends-upon-lower/.svg gh-pages/examples/stack/upper-depends-upon-lower.svg &&
cp getSvgForYaml/test/test-cases/two/.svg gh-pages/examples/two.svg &&
cp getSvgForYaml/test/withSubset/test-cases/upper-item-depends-upon-lower-item-with-parent.svg gh-pages/examples