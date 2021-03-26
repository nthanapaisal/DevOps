var validateInputs = require('../misc/validateInputs');
var expect = require('chai').expect;
const fetch = require('isomorphic-fetch')



describe('#validateInputs', function() {

    beforeEach(function() {
        // ...some logic before each test is run
        
      })

    // test address parameter
    context('post request with address longer than 1024 characters', function() {
        it('should return 1', function() {
          expect(validateInputs.validatePost("NDasdasdVhqsfL1uQxL3omvjMTICjLhEx5osXGpc132Q6mBdiTpD2akhYePoM7gDqUEiVO72Whb2H2KLxwoB1E4k1ROmN7xCfEwO6UtsoE9DoDTv62c2odRCzaoVGWqJeEJrzGulaesNbl7kGiYwY42CsruUY6rAE59SV1mASoUs7lVFFwIzjdPwFZhG1HJt87gv9zf7rtToCiioIwabZUZWXMugRHsCKstteKxNTd1Cv75cHgCVCOLNCzjg1abvJKHELRKVoYmOmpyOXDe9Rdvp5GA3hmniwUPerhzO5qWVd5CxHb7FopmI1nwPAb9gPQYq5aHIpuUtNMDIWjPqV2XsG4VBy9oSWDKHLJBIYTuz0QzP11vkz6EBUwLqkflOHUnCQMZwhc4mfoTxIAa1QFSBG8iKtY91LZXu3YLo0wWLIRBC2BaAphqX3yd25Pqx5tlEFyBI7NjApZ1XtobBwQn4giaWcuU9ZbHLJeVxQpHFEUkEwwNI2rGIV890qk0nYd4w7pg0UD7NzE30SqVcPGfmM0w63W5nWh3BwMda4yauu6DJLMgcxt8V6OmzZ67cKe1LAlBSqFXSzuLQbB9LmEqPCzmdGiAJ15qa5WvX46Jl6Ve6XmQLl1fsE8nNI4VonKlvY9PbijYzwtfXQfbYggUakdoYjhAdWojfTn18uadWBunZ5CRj4zPeGzKOKColyKMvkEYfiFvD48reQDqq3DyQuyJnu28xkel0hcEwQ935hTmeAESLEMP2k8Ws1ARYJsxfUgie7NKEltsC2AkuFJ4bLxsFptMBC1wnpto8Re6A2IVL2Dz9I7v40lG4ckTTFFRZI3SBF8NpWjnKqknQ220bxuXZyqSl1BEblRNs6eNHtG7lcWeixVcbmnMIZuN3PiWIx0hp2jDASz8hLno5HYRievwnnOKTJpaiEXNbdMb7ZEHI0HatLURtnWjv2CU0Uu8R4wWLCtoHFRXMKNur34EDuFLE0D0ZECpi0rQsx1alqeoquqr61IWJ13pAHADn3SAIHi",
          "city", "st", "11111")).to.equal(1);
        })
    })
    context('post request with address less than 1 character', function() {
        it('should return 1', function() {
          expect(validateInputs.validatePost("", "city", "st", "11111")).to.equal(1)  
        })
    })
    context('post request with null address', function() {
        it('should return 1', function() {
          expect(validateInputs.validatePost(null, "city", "st", "11111")).to.equal(1)  
        })
    })
    context('post request with valid address', function() {
        it('should return 0', function() {
          expect(validateInputs.validatePost("123 Street Way", "city", "st", "11111")).to.equal(0)  
        })
    })

    // test city parameter 
    context('post request with city longer than 255 characters', function() {
        it('should return 2', function() {
          expect(validateInputs.validatePost("123 Street Way",
          "5DL1KhvYMS462aoTqie9HJ819plXIGvQpxFKEfIJZYXWe89a0Bwc9NqD7SMPKMHx7lqouLreFnaJQjljZwCtXJqbEjreW8zeGdDvC6AHIdDTlAFrrxzntxeKMDO6D3M359fk1c9PF9iRyffdzaPzCDyQMo8IHumeO6pq7OXXEUuOhnOZyPwXL0zZTiVWhP2AvpPcGJT5MmEyy8zZiwYLF68TRD13gtXAtNvn7WeZjo02tBWQMLWV2WYbL0XAyGD3",
          "st", "11111")).to.equal(2);
        })
    })
    context('post request with city less than 1 character', function() {
        it('should return 2', function() {
          expect(validateInputs.validatePost("123 Street Way", "", "st", "11111")).to.equal(2)  
        })
    })
    context('post request with valid city', function() {
        it('should return 0', function() {
          expect(validateInputs.validatePost("123 Street Way", "Austin", "st", "11111")).to.equal(0)  
        })
    })
})