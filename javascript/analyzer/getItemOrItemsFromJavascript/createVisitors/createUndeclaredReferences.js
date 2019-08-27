// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	() => {
		const parentsOfParentByUndeclaredReferences = new Map();

		return (
			{
				addAncestorsAndParentOfReference,
				hasReferenceTo,
			}
		);

		function addAncestorsAndParentOfReference({
			ancestors,
			parent,
			reference,
		}) {
			parentsOfParentByUndeclaredReferences.set(
				reference,
				[
					...parentsOfParentByUndeclaredReferences.get(reference) || [],
					...ancestors.filter(ancestor => ancestor !== parent),
				],
			);
		}

		function hasReferenceTo({
			parent,
			reference,
		}) {
			const parentsOfReferenceParent =
				parentsOfParentByUndeclaredReferences.get(reference);

			return (
				parentsOfReferenceParent
				&&
				(!parent || parentsOfReferenceParent.includes(parent))
			);
		}
	};