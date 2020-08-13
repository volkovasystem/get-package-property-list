"use strict";

/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor

			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>

			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/

const https = require( "https" );
const util = require( "util" );

const PACKAGE_PROPERTY_LIST = (
	require( "./package-property-list.constant.js" )
);

const PROPERTY_NAMESPACE_PATTERN = (
	/^[a-zA-Z0-9]+$/
);

const requestGetSource = (
	function requestGetSource( ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		return	(
					new	Promise(
							function( resolve, reject ){
								https
								.get
								.apply(
									(
										https
									),

									(
										parameterList
										.concat(
											(
												[
													function callback( response ){
														const resultList = (
															[ ]
														);

														response
														.on(
															(
																"error"
															),

															(
																reject
															)
														);

														response
														.on(
															(
																"data"
															),

															(
																( result ) => {
																	resultList
																	.push(
																		(
																			result
																		)
																	);
																}
															)
														);

														response
														.on(
															(
																"end"
															),

															(
																( ) => {
																	resolve(
																		(
																			resultList
																			.join(
																				(
																					""
																				)
																			)
																		)
																	);
																}
															)
														);
													}
												]
											)
										)
									)
								)
								.on(
									(
										"error"
									),

									(
										reject
									)
								);
							}
						)
				);
	}
);

const getSourcePropertyList = (
	async	function getSourcePropertyList( propertyListSourcePath ){
				const sourceResult = (
					await	requestGetSource(
								(
									propertyListSourcePath
								),

								(
									{
										"headers": {
											"Content-Type": (
												[
													"text/plain",
													"charset=utf-8"
												]
												.join(
													(
														";"
													)
												)
											)
										}
									}
								)
							)
				);

				const sourcePropertyList = (
					sourceResult
					.trim( )
					.split(
						(
							/[\,][\s\t\n\r]+/gm
						)
					)
					.filter(
						(
							( property ) => (
									PROPERTY_NAMESPACE_PATTERN
									.test(
										(
											property
										)
									)
								===	true
							)
						)
					)
				);

				return	(
							sourcePropertyList
						);
			}
);

const getPackagePropertyList = (
	async	function getPackagePropertyList( option ){
				/*;
					@procedure-definition:
						Provide basic and extensible standard convention for NPM package property list.
					@end-procedure-definition

					@parameter-definition:
						{
							"option": "
								[
									@type:
											object with {
												"propertyList": "
													[
														@type:
																object as Array of string
														@end-type

														<@optional;>
													]
												",

												"propertyListSourcePath": "
													[
														@type:
																string
														@end-type

														<@optional;>
													]
												"
											}
									@end-type

									<@optional;>
								]
							"
						}
					@end-parameter-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											object as Array of string
									@end-type
								]
							"
						}
					@end-result-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type

									<@tag:cannot-get-package-property-list;>
								]
							"
						}
					@end-trigger-definition
				*/

				try{
						option
					=	(
								(
									option
								)

							||	(
									{ }
								)
						);

					const propertyList = (
							(
								option
								.propertyList
							)

						||	(
								undefined
							)
					);

					const propertyListSourcePath = (
							(
								option
								.propertyListSourcePath
							)

						||	(
								undefined
							)
					);

					if(
							(
									typeof
									propertyListSourcePath
								==	"string"
							)

						&&	(
									propertyListSourcePath
									.length
								>	0
							)
					){
						return	(
									await	getSourcePropertyList(
												(
													propertyListSourcePath
												)
											)
								);
					}
					else if(
							(
									Array
									.isArray(
										(
											propertyList
										)
									)
								===	true
							)

						&&	(
									propertyList
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
					){
						return	(
									Array
									.from(
										(
											propertyList
										)
									)
									.filter(
										(
											( property ) => (
													PROPERTY_NAMESPACE_PATTERN
													.test(
														(
															property
														)
													)
												===	true
											)
										)
									)
								);
					}
					else{
						return	(
									Array
									.from(
										(
											PACKAGE_PROPERTY_LIST
										)
									)
								);
					}
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-get-package-property-list;",

												"cannot get package property list;",
												"cannot execute get package property list;",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = getPackagePropertyList;
