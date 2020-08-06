#! /usr/bin/env node

const PROPERTY_LIST_SHELL_PARAMETER = (
	"--propertyList"
);

const PROPERTY_LIST_URI_PATH_SHELL_PARAMETER = (
	"--propertyListURIPath"
);

(
	async	function runGetPackagePropertyList( shellParameterList ){
				"use strict";

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
									/[\,\s\t\n\r]+/gm
								)
							)
						)
					:	(
							undefined
						)
				);

				const propertyListURIPath = (
						(
								(
										shellParameterList
										.includes(
											(
												PROPERTY_LIST_URI_PATH_SHELL_PARAMETER
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
												PROPERTY_LIST_URI_PATH_SHELL_PARAMETER
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

													"propertyListURIPath": (
														propertyListURIPath
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
