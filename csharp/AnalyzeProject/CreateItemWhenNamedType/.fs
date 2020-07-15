module rec DevSnicket.Eunice._AnalyzeProject.CreateItemWhenNamedType

open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWithMembers
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWithoutMembers

type MemberBehavior = DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.MemberBehavior

let createItemWhenNamedType =
    function
    | MemberBehavior.None -> createItemWithoutMembers
    | MemberBehavior.Level -> createItemWithMembers