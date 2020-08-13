"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

const executeShellCommand = (
	async	function executeShellCommand( shellCommand, moduleDirectoryPath ){
				const childProcess = require( "child_process" );

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	util
										.promisify(
											(
												childProcess
												.exec
											)
										)(
											(
												shellCommand
											),

											(
												{
													"cwd": (
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

const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellCommand(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellCommand(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);

const getPackagePropertyList = (
	require( "./get-package-property-list.js" )
);

const TEST_GET_PACKAGE_PROPERTY_LIST = (
	async	function TEST_SAMPLE_UNIT( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				(
					await	SETUP_TEST_DIRECTORY( )
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
						await	CLEAN_TEST_DIRECTORY( )
					);
				}
			}
);

const TEST_GET_PACKAGE_PROPERTY_LIST_SOURCE_PATH = (
	async	function TEST_SAMPLE_UNIT( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				(
					await	SETUP_TEST_DIRECTORY( )
				);

				try{
					const actualPackagePropertyList = (
						await	getPackagePropertyList(
									(
										{
											"propertyListSourcePath": (
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
								"#test-get-package-property-list-source-path;",

								"test get package property list source path;",
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
						await	CLEAN_TEST_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
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
									"test get package property list source path"
								),

								"result": (
									await	TEST_GET_PACKAGE_PROPERTY_LIST_SOURCE_PATH( )
								)
							}
						]
					)
				);

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
