export = Yaml

type Yaml = string | Array<string | YamlItem | Array<string | YamlItem>>

interface YamlItem {
	readonly dependsUpon?: string | YamlDependsUpon | Array<string | YamlDependsUpon>
	readonly id?: string
	readonly items?: Yaml
}

interface YamlDependsUpon {
	readonly id: string
	readonly items?: Array<string | YamlDependsUpon>
}