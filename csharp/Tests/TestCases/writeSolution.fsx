open System
open System.IO

type Project = {
    FilePath: String
    Guid: String
}

let findProjectFilesInDirectoryPath directoryPath =
    Directory.EnumerateFiles(
        directoryPath,
        "*.csproj",
        EnumerationOptions(RecurseSubdirectories = true)
    )

let createProjectFromFilePath projectFilePath =
    {
        FilePath = projectFilePath
        Guid = Guid.NewGuid().ToString()
    }

let getSolutionLinesForProjects projects =
    let getProjectLinesForProject project =
        let name = Path.GetDirectoryName(project.FilePath).Replace(Path.DirectorySeparatorChar, '-');

        seq [
            "Project(\"{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}\") = \""+ name + "\", \"" + project.FilePath + "\", \"{" + project.Guid + "}\""
            "EndProject"
        ]

    let getConfigurationLinesForProject project =
        seq [
            "ActiveCfg"
            "Build.0"
        ]
        |> Seq.map (fun configuration -> "{" + project.Guid + "}.Debug|Any CPU." + configuration + " = Debug|Any CPU")

    let indentLines =
        Seq.map (fun line -> "\t" + line)

    seq [
        "Microsoft Visual Studio Solution File, Format Version 12.00"
        yield! projects |> Seq.collect getProjectLinesForProject
        "Global"
        yield!
            seq [
                "GlobalSection(SolutionConfigurationPlatforms) = preSolution"
                "\tDebug|Any CPU = Debug|Any CPU"
                "EndGlobalSection"
                "GlobalSection(ProjectConfigurationPlatforms) = postSolution"
                yield!
                    projects
                    |> Seq.collect getConfigurationLinesForProject
                    |> indentLines
                "EndGlobalSection"
            ]
            |> indentLines
        "EndGlobal"
    ]

let writeSolutionFileForDirectoryPaths (solutionFile, directoryPaths) =
    directoryPaths
    |> Seq.collect findProjectFilesInDirectoryPath
    |> Seq.map createProjectFromFilePath
    |> Seq.toList
    |> getSolutionLinesForProjects
    |> fun lines -> File.WriteAllLines(solutionFile, lines)

writeSolutionFileForDirectoryPaths(
    "build.sln",
    seq [
        "MembersNone"
        [| "MembersLevel"; "Valid" |] |> Path.Join
    ]
)

writeSolutionFileForDirectoryPaths(
    "restore-target-framework-supported.sln",
    seq [ [| "MembersLevel"; "Invalid"; "TargetFrameworkSupported" |] |> Path.Join ]
);

writeSolutionFileForDirectoryPaths(
    "restore-target-framework-not-supported.sln",
    seq [ [| "MembersLevel"; "Invalid"; "TargetFrameworkNotSupported" |] |> Path.Join ]
);