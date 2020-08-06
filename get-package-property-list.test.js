"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

const getPackagePropertyList = (
	require( "./get-package-property-list.js" )
);

const executeShellCommand = (
	async	function executeShellCommand( shellCommand, moduleDirectoryPath ){
				const childProcess = require( "child_process" );

				const executeAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	executeAsync(
											(
												shellCommand
											),

											(
												{
													"moduleDirectoryPath": (
															(
																moduleDirectoryPath
															)

														||	(
																process
																.cwd( )
															)
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);

const TEST_SETUP_DIRECTORY = (
	async	function TEST_SETUP_DIRECTORY( ){
				return	(
							await	executeShellCommand(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const TEST_CLEANUP_DIRECTORY = (
	async	function TEST_CLEANUP_DIRECTORY( ){
				return	(
							await	executeShellCommand(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);

const TEST_GET_PACKAGE_PROPERTY_LIST = (
	async	function TEST_SAMPLE_UNIT( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				try{
					const actualPackagePropertyList = (
						await	getPackagePropertyList( )
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
								(
										Array
										.isArray(
											(
												actualPackagePropertyList
											)
										)
									===	true
								)

							&&	(
										actualPackagePropertyList
										.length
									>	0
								)

							&&	(
										actualPackagePropertyList
										.every(
											(
												( property ) => (
														typeof
														property
													==	"string"
												)
											)
										)
									===	true
								)
						),

						(
							testValue
						),

						(
							[
								"#test-get-package-property-list;",

								"test get package property list;",
								"must return an object as Array of string;",
								`must assert to ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	TEST_CLEANUP_DIRECTORY( )
					);
				}
			}
);

const TEST_GET_PACKAGE_PROPERTY_LIST_URI_PATH = (
	async	function TEST_SAMPLE_UNIT( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				(
					await	TEST_SETUP_DIRECTORY( )
				);

				try{
					const actualPackagePropertyList = (
						await	getPackagePropertyList(
									(
										{
											"propertyListURIPath": (
												"https://raw.githubusercontent.com/volkovasystem/test-get-package-property-list/master/test-package-property-list.txt"
											)
										}
									)
								)
					);

					const testPackagePropertyList = (
						[
							"name",
							"version",
							"description"
						]
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
								(
										Array
										.isArray(
											(
												actualPackagePropertyList
											)
										)
									===	true
								)

							&&	(
										actualPackagePropertyList
										.length
									>	0
								)

							&&	(
										actualPackagePropertyList
										.toString( )
									===	testPackagePropertyList
										.toString( )
								)
						),

						(
							testValue
						),

						(
							[
								"#test-get-package-property-list-uri-path;",

								"test get package property list uri path;",
								`must return package property list, ${ testPackagePropertyList };`,
								`must assert to ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	TEST_CLEANUP_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	TEST_CLEANUP_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test get package property list"
								),

								"result": (
									await	TEST_GET_PACKAGE_PROPERTY_LIST( )
								)
							},

							{
								"test": (
									"test get package property list uri path"
								),

								"result": (
									await	TEST_GET_PACKAGE_PROPERTY_LIST_URI_PATH( )
								)
							}
						]
					)
				);

				(
					await	TEST_CLEANUP_DIRECTORY( )
				);
			}
)( );
