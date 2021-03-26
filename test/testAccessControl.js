var accessControl = require('../misc/accessControl');
var expect = require('chai').expect;

describe('#accessControl', function() {

    context('with incorrect api key', function() {
        it('should return false', function() {
          expect(accessControl.validateAPIKey("cs4783ftw")).to.equal(false)  
        })
    })

    context('with empty key', function() {
        it('should return false', function() {
            expect(accessControl.validateAPIKey("")).to.equal(false)  
        })

    })

    context('with correct key', function() {
        it('should return true', function() {
            expect(accessControl.validateAPIKey("cs4783ftw!")).to.equal(true)  
        })

    })
})