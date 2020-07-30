import Stack from "../../Stack"
import Yaml from "../../Yaml"

export = Parameter

type Parameter = (stackAndYamlTest: StackAndYamlTest) => void

interface StackAndYamlTest {
	readonly getActual: ({ stack: Stack, yaml: Yaml }) => any
	readonly getExpected: ({ stack: Stack, yaml: Yaml }) => any
	readonly getName: ({ stackDescription: string, yaml }) => string
}