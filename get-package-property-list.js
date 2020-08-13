parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.getPackagePropertyList=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({BERS:[function(require,module,exports){"use strict";const PACKAGE_PROPERTY_LIST=Object.freeze(["name","version","description","main","scripts","repository","keywords","author","contributors","license","bugs","homepage"]);module.exports=PACKAGE_PROPERTY_LIST},{}],ci8B:[function(require,module,exports){"use strict";
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
*/const https=require("https"),util=require("util"),PACKAGE_PROPERTY_LIST=require("./package-property-list.constant.js"),PROPERTY_NAMESPACE_PATTERN=/^[a-zA-Z0-9]+$/,getSourcePropertyList=async function(propertyListSourcePath){return(await function(){const parameterList=Array.from(arguments);return new Promise((function(resolve,reject){https.get.apply(https,parameterList.concat([function(response){const resultList=[];response.on("error",reject),response.on("data",result=>{resultList.push(result)}),response.on("end",()=>{resolve(resultList.join(""))})}])).on("error",reject)}))}(propertyListSourcePath,{headers:{"Content-Type":["text/plain","charset=utf-8"].join(";")}})).trim().split(/[\,][\s\t\n\r]+/gm).filter(property=>!0===PROPERTY_NAMESPACE_PATTERN.test(property))};module.exports=async function(option){try{const propertyList=(option=option||{}).propertyList||void 0,propertyListSourcePath=option.propertyListSourcePath||void 0;return"string"==typeof propertyListSourcePath&&propertyListSourcePath.length>0?await getSourcePropertyList(propertyListSourcePath):!0===Array.isArray(propertyList)&&!0===propertyList.every(property=>"string"==typeof property)?Array.from(propertyList).filter(property=>!0===PROPERTY_NAMESPACE_PATTERN.test(property)):Array.from(PACKAGE_PROPERTY_LIST)}catch(error){throw new Error(["#cannot-get-package-property-list;","cannot get package property list;","cannot execute get package property list;","@error-data:",util.inspect(error)+";"])}}},{"./package-property-list.constant.js":"BERS"}]},{},["ci8B"]);