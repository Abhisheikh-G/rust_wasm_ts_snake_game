/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("async function init() {\n  const importObject = {\n    console: {\n      log: () => {\n        console.log(\"Logging...\");\n      },\n      error: () => {\n        console.log(\"Logging error...\");\n      },\n    },\n  };\n  const response = await fetch(\"sum.wasm\");\n  const buffer = await response.arrayBuffer();\n  const wasm = await WebAssembly.instantiate(buffer, importObject);\n  const sumFunction = wasm.instance.exports.sum;\n  const result = sumFunction(70, 80);\n  console.log(result);\n}\n\ninit();\n\n\n//# sourceURL=webpack://www/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;