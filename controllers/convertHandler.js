function ConvertHandler() {
  
  this.getNum = function(input) {
    const numberPart = input.match(/[.\d\/]+/g) || ['1'];

    if (numberPart.length > 1) {
      return undefined
    }

    const nums = numberPart[0].split('/')

    if (nums.length > 2) {
      return undefined
    }

    const num1 = nums[0]
    const num2 = nums[1] || "1"

    if (isNaN(num1) || isNaN(num2)) {
      return undefined
    }

    const result = parseFloat(num1) / parseFloat(num2)

    return result;
  };
  
  this.getUnit = function(input) {
    const unitPart = input.match(/[a-zA-Z]+/g)
    let result

    switch(unitPart[0].toLowerCase()) {
      case 'gal':
        result = 'gal'
        break
      case 'l':
        result = 'L'
        break
      case 'mi':
        result = 'mi'
        break
      case 'km':
        result = 'km'
        break
      case 'lbs':
        result = 'lbs'
        break
      case 'kg':
        result = 'kg'
        break
      default:
        return undefined
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    switch(initUnit) {
      case 'gal':
        result = 'L'
        break
      case 'L':
        result = 'gal'
        break
      case 'mi':
        result = 'km'
        break
      case 'km':
        result = 'mi'
        break
      case 'lbs':
        result = 'kg'
        break
      case 'kg':
        result = 'lbs'
        break
      default:
        return 'something is broken'
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit) {
      case 'gal':
        result = 'gallons'
        break
      case 'L':
        result = 'liters'
        break
      case 'mi':
        result = 'miles'
        break
      case 'km':
        result = 'kilometers'
        break
      case 'lbs':
        result = 'pounds'
        break
      case 'kg':
        result = 'kilograms'
        break
      default:
        return 'something is broken'
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break 
      case 'L':
        result = initNum / galToL
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miToKm
        break
      case 'lbs':
        result = initNum / lbsToKg
        break
      case 'kg':
        result = initNum * lbsToKg
      default:
        return 'something is broken'
    }
    
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
