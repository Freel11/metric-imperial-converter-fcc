'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (!initNum && !initUnit) {
      res.send("invalid number and unit")
    } else if (!initNum) {
      res.send("invalid number")
    } else if (!initUnit) {
      res.send("invalid unit")
    } 

    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnNum = parseFloat(convertHandler.convert(initNum, initUnit))
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    res.send({
      initNum, 
      initUnit, 
      returnNum,
      returnUnit,
      string
    })

  })

};
