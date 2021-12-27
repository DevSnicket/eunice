// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject.CreateItemWhenNamedType

open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWithMembers
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWithoutMembers

type MemberBehavior = DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.MemberBehavior

let createItemWhenNamedType =
    function
    | MemberBehavior.None -> createItemWithoutMembers
    | MemberBehavior.Level -> createItemWithMembers