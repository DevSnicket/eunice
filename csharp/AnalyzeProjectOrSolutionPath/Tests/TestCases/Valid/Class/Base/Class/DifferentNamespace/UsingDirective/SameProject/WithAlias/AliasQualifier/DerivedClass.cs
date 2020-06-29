using BaseClassNamespaceAlias = BaseClassNamespace;

namespace DerivedClassNamespace {
	class DerivedClass : BaseClassNamespaceAlias::BaseClass { }
}