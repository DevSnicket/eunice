using FieldEnumNamespaceAlias = FieldEnumNamespace;

class Class {
	#pragma warning disable CS0414
	FieldEnumNamespace.FieldEnum _field = FieldEnumNamespaceAlias.FieldEnum.Value;
	#pragma warning restore CS0414
}