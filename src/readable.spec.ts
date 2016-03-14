import {define} from "./readable";
import {FunctionDefinitions} from "./readable";
import chai = require('chai');
import sinon = require('sinon');
import sinonChai = require('sinon-chai');
import {execute} from "./readable";
import {defineAs} from "./readable";

chai.should();
chai.use(sinonChai);

describe('readable', () => {

  describe('execute', () => {

    it('should execute a function defined with no parameters', () => {
      // arrange
      let func = sinon.spy();
      let functions: FunctionDefinitions = [{
        regex: /just run this/,
        args: [],
        func
      }];

      // act
      execute(functions, 'just run this');

      // assert
      func.should.have.been.calledWith();
    });

    it('should execute a function defined with a single parameter', () => {
      // arrange
      let func = sinon.spy();
      let functions: FunctionDefinitions = [{
        regex: /call this with (.*)/,
        args: [
          /call this with (.*)/
        ],
        func
      }];

      // act
      execute(functions, 'call this with something');

      // assert
      func.should.have.been.calledWith('something');
    });

    it('should execute a function defined with several parameters', () => {
      // arrange
      let func = sinon.spy();
      let functions: FunctionDefinitions = [{
        regex: /call this with (.*) and (.*)/,
        args: [
          /call this with (.*)/
        ],
        func
      }];

      //act
      execute(functions, 'call this with something and another');

      func.should.have.been.calledWith('something', 'another');
    });

    it('should return the result of the function when executed', () => {
      // arrange
      let func = sinon.stub().returns(5);
      let functions: FunctionDefinitions = [{
        regex: /the sum of (.*) and (.*)/,
        args:[],
        func
      }];

      // act
      let result = execute(functions, 'the sum of 2 and 4');

      // assert
      func.should.have.been.calledWith(2,4);
      result.should.equal(5);
    });
  });

  describe('defineAs', () => {
    it('should add a function with all parameters replaced in the regex', () => {
      // arrange
      let functions: FunctionDefinitions = [];
      let func = sinon.spy();

      // act
      let result = defineAs(functions, 'the sum of "a" and "b"', func);

      chai.expect(result[0].regex.toString()).to.equal('/the sum of (.+) and (.+)/i');
    });
  });
});