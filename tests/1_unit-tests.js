const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
	suite('Function convertHandler.getNum(input)', () => {
		test('Whole number input', done => {
			const input = '32L'
			assert.equal(convertHandler.getNum(input), 32)
			done()
		})
		test('Decimal number input', done => {
			const input = '3.5mi'
			assert.equal(convertHandler.getNum(input), 3.5)
			done()
		})
		test('Fractional input', done => {
			const input = '3/5kg'
			assert.equal(convertHandler.getNum(input), 0.6)
			done()
		})
		test('Fractional input with decimal', done => {
			const input = '1.5/2dogs'
			assert.equal(convertHandler.getNum(input), 0.75)
			done()
		})
		test('Double fracion error', done => {
			const input = '1/8/5mi'
			assert.equal(convertHandler.getNum(input), undefined)
			done()
		})
		test('Default to one', done => {
			const input = 'mi'
			assert.equal(convertHandler.getNum(input), 1)
			done()
		})
	})

	suite('Function convertHandler.getUnit(input)', () => {
		test('Read valid input unit', done => {
			const input = '3.5Mi'
			assert.equal(convertHandler.getUnit(input), 'mi')
			done()
		})
		test('error on invalid input', done => {
			const input = "3.5mif"
			assert.equal(convertHandler.getUnit(input), undefined)
			done()
		})
		test('correct return on each input', done => {
			const input = [
				'gal',
				'l',
				'mi',
				'km',
				'lbs',
				'kg',
				'GAL',
				'L',
				'MI',
				'KM',
				'LBS',
				'KG'
			]
			const output = [
				'gal',
				'L',
				'mi',
				'km',
				'lbs',
				'kg',
				'gal',
				'L',
				'mi',
				'km',
				'lbs',
				'kg'
			]
			input.forEach((x, i) => {
				assert.equal(convertHandler.getUnit(x), output[i])
			})
			done()
		})
	})

	suite('Function convertHandler.spellOutUnit(input)', () => {
		test('Correctly return spelled out unit input', done => {
			const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
			const output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']

			input.forEach((x, i) => {
				assert.equal(convertHandler.spellOutUnit(x), output[i])
			})
			done()
		})
	})

	suite('Function convertHandler.convert(initNum, initUnit)', () => {
		test('Correctly convert gal to L', done => {
			const initNum = 1
			const initUnit = 'gal'
			assert.equal(convertHandler.convert(initNum, initUnit), 3.78541)
			done()
		})
		test('Correctly convert L to gal', done => {
			const initNum = 1
			const initUnit = 'L'
			assert.equal(convertHandler.convert(initNum, initUnit), 0.26417)
			done()
		})
		test('Correctly convert mi to km', done => {
			const initNum = 1
			const initUnit = 'mi'
			assert.equal(convertHandler.convert(initNum, initUnit), 1.60934)
			done()
		})
		test('Correctly convert km to mi', done => {
			const initNum = 1
			const initUnit = 'km'
			assert.equal(convertHandler.convert(initNum, initUnit), 0.62137)
			done()
		})
		test('Correctly convert lbs to kg', done => {
			const initNum = 1
			const initUnit = 'lbs'
			assert.equal(convertHandler.convert(initNum, initUnit), 0.45359)
			done()
		})
		test('Correctly convert kg to lbs', done => {
			const initNum = 1
			const initUnit = 'kg'
			assert.equal(convertHandler.convert(initNum, initUnit), 2.20462)
			done()
		})
	})
});