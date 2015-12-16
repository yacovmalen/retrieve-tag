/**
 * Created by yacov on 11/12/15.
 */
var expect = require('chai').expect,
    func = require('../index'),
    sinon = require('sinon'),
    exec = require('child_process'),
    proxyquire = require('proxyquire'),
    jiraApi = require('jira').JiraApi,
    pathStub = {};

var execStub = sinon.stub(exec, 'exec');
var testFile = proxyquire('../index', {'child_process': execStub});

describe('Retrieve Tag', function(){

    before(function(){
        execStub.returns('123');
    });

    it('should get error from bad input location', function(){
        expect(func.retrieveTag.bind(func.retrieveTag, 'anywhere', /%352/)).to.throw(Error);
    });

    it('should not get error from input location message', function(){
        expect(func.retrieveTag.bind(func.retrieveTag, 'message', /%352/)).not.to.throw(Error);
        expect(func.retrieveTag.bind(func.retrieveTag, 'MESSAGE', /%352/)).not.to.throw(Error);
    });

    it('should not get error from input location branch', function(){
        expect(func.retrieveTag.bind(func.retrieveTag, 'branch', /%352/)).not.to.throw(Error);
        expect(func.retrieveTag.bind(func.retrieveTag, 'BRANCH', /%352/)).not.to.throw(Error);
    });

    it('should call the callback on exec', function(){
        testFile.retrieveTag('branch', /%352/);
        expect(execStub.calledOnce).to.be.true;
    });

    it('should call exec with the correct branch command', function(){
        testFile.retrieveTag('branch', /%352/);
        expect(execStub.calledWith('git rev-parse --abbrev-ref HEAD')).to.be.true;
    });

    it('should call exec with the message command', function(){
        testFile.retrieveTag('message', /%352/);
        expect(execStub.calledWith('git show --pretty=format:"%s"')).to.be.true;
    })
});

describe('Getting Jira Component', function(){

    before(function(){
        execStub.returns('123');
    });

});