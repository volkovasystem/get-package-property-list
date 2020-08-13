#! /usr/bin/env node

(
	async	function runGetPackagePropertyList( shellParameterList ){
				"use strict";

				const PROPERTY_LIST_SHELL_PARAMETER = (
					"--propertyList"
				);

				const PROPERTY_LIST_SOURCE_PATH_SHELL_PARAMETER = (
					"--propertyListSourcePath"
				);

				const getPackagePropertyList = (
					require( "./get-package-property-list.js" )
				);

				const propertyList = (
						(
								(
										shellParameterList
										.includes(
											(
												PROPERTY_LIST_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							(
								shellParameterList[
									(
										(
											shellParameterList
											.indexOf(
												(
													PROPERTY_LIST_SHELL_PARAMETER
												)
											)
										)+1
									)
								]
							)
							.split(
								(
									/[\,][\s\t\n\r]+/gm
								)
							)
						)
					:	(
							undefined
						)
				);

				const propertyListSourcePath = (
						(
								(
										shellParameterList
										.includes(
											(
												PROPERTY_LIST_SOURCE_PATH_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												PROPERTY_LIST_SOURCE_PATH_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
							undefined
						)
				);

				return	(
							(
								await	getPackagePropertyList(
											(
												{
													"propertyList": (
														propertyList
													),

													"propertyListSourcePath": (
														propertyListSourcePath
													)
												}
											)
										)
							)
							.join(
								(
									","
								)
							)
						);
			}
)(
	(
		process
		.argv
	)
);
