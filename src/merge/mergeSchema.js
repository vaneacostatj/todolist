//para importar todos los archivos de una carpeta 
const { mergeTypeDefs } = require('@graphql-tools/merge')
const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')

const typesArray = loadFilesSync(path.join(__dirname, '..','schemas'), {extensions: ['js']})
console.log("pepe", typesArray);
module.exports = mergeTypeDefs(typesArray)