const { connect } = require('mongoose');
const { db } = require ('./config')
const connectDB = connect(db);

module.exports = { connectDB }