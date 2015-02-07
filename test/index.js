
var Test = require('segmentio-integration-tester');
var helpers = require('./helpers');
var facade = require('segmentio-facade');
var fmt = require('util').format;
var should = require('should');
var assert = require('assert');
var IronIO = require('..');

describe('Iron IO v2', function(){
  var settings;
  var iron;
  var test;
  var error;

  beforeEach(function(){
    //
    settings = {
      projectId: '534bf145c629690009000039',
      token: 'uwa4ZE1ykvC5aHgsrkC2HAPJw2o',
      endpoint: 'https://mq-aws-us-east-1.iron.io:443',
      apiVersion: '1'
    };
    iron = new IronIO(settings);
    test = Test(iron, __dirname);
  });

  beforeEach(function(){
    error = fmt('cannot POST /1/projects/%s/queues/segment/messages?oauth=x (401)', settings.projectId);
  })

  it('should have the correct settings', function(){
    test
      .name('Iron.io')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.projectId')
      .ensure('settings.token')
      .ensure('settings.endpoint');
  });

  describe('.validate()', function(){
    it('should be invalid when .token is missing', function(){
      delete settings.token;
      test.invalid({}, settings);
    });

    it('should be invalid when .projectId is missing', function(){
      delete settings.projectId;
      test.invalid({}, settings);
    });

    it('should be invalid when .endpoint is missing', function(){
      delete settings.endpoint;
      test.invalid({}, settings);
    });

    it('should be invalid when .endpoint is missing', function(){
      delete settings.apiVersion;
      test.invalid({}, settings);
    });

    it('should be vaild when both .projectId, .token, endpoint, and api version are given', function(){
      test.valid({}, settings);
    });
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });
    });

    describe('screen', function(){
      it('should map basic screen', function(){
        test.maps('screen-basic');
      });
    });

    describe('alias', function(){
      it('should map basic alias', function(){
        test.maps('alias-basic');
      });
    });

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });

    describe('page', function(){
      it('should map basic page', function(){
        test.maps('page-basic');
      });
    });
  });

  describe('.track()', function(){
    it('should track correctly', function(done){
      var msg = helpers.track();
      test
        .set(settings)
        .track(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .track({})
        .error(error, done);
    });
  });

  describe('.identify()', function(){
    it('should be able to identify correctly', function(done){
      var msg = helpers.identify();
      test
        .set(settings)
        .identify(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .identify({})
        .error(error, done);
    });
  });

  describe('.screen()', function(){
    it('should be able to screen correctly', function(done){
      var msg = helpers.screen();
      test
        .set(settings)
        .screen(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .screen({})
        .error(error, done);
    });
  });

  describe('.page()', function(){
    it('should be able to page correctly', function(done){
      var msg = helpers.page();
      test
        .set(settings)
        .page(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .page({})
        .error(error, done);
    });
  });

  describe('.alias()', function(){
    it('should be able to alias correctly', function(done){
      var msg = helpers.alias();
      test
        .set(settings)
        .alias(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .alias({})
        .error(error, done);
    });
  });

  function message(msg){
    return {
      messages: [
        { body: JSON.stringify(msg.json()) }
      ]
    };
  }
});



describe('Iron IO v3', function(){
  var settings;
  var iron;
  var test;
  var error;

  beforeEach(function(){
    settings = {
      projectId: '54c96901ccd9880007000005',
      token: 'ao3ab3hkFkiP270d4rTf',
      endpoint: 'http://mq-v3-aws-us-east-1.iron.io',
      apiVersion: '3'
    };
    iron = new IronIO(settings);
    test = Test(iron, __dirname);
  });

  beforeEach(function(){
    error = fmt('cannot POST /3/projects/%s/queues/segment/messages?oauth=x (401)', settings.projectId);
  })

  it('should have the correct settings', function(){
    test
      .name('Iron.io')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.projectId')
      .ensure('settings.token')
      .ensure('settings.endpoint');
  });

  describe('.validate()', function(){
    it('should be invalid when .token is missing', function(){
      delete settings.token;
      test.invalid({}, settings);
    });

    it('should be invalid when .projectId is missing', function(){
      delete settings.projectId;
      test.invalid({}, settings);
    });

    it('should be invalid when .endpoint is missing', function(){
      delete settings.endpoint;
      test.invalid({}, settings);
    });

    it('should be invalid when .endpoint is missing', function(){
      delete settings.apiVersion;
      test.invalid({}, settings);
    });

    it('should be vaild when both .projectId, .token, endpoint, and api version are given', function(){
      test.valid({}, settings);
    });
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });
    });

    describe('screen', function(){
      it('should map basic screen', function(){
        test.maps('screen-basic');
      });
    });

    describe('alias', function(){
      it('should map basic alias', function(){
        test.maps('alias-basic');
      });
    });

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });

    describe('page', function(){
      it('should map basic page', function(){
        test.maps('page-basic');
      });
    });
  });

  describe('.track()', function(){
    it('should track correctly', function(done){
      var msg = helpers.track();
      test
        .set(settings)
        .track(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .track({})
        .error(error, done);
    });
  });

  describe('.identify()', function(){
    it('should be able to identify correctly', function(done){
      var msg = helpers.identify();
      test
        .set(settings)
        .identify(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .identify({})
        .error(error, done);
    });
  });

  describe('.screen()', function(){
    it('should be able to screen correctly', function(done){
      var msg = helpers.screen();
      test
        .set(settings)
        .screen(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .screen({})
        .error(error, done);
    });
  });

  describe('.page()', function(){
    it('should be able to page correctly', function(done){
      var msg = helpers.page();
      test
        .set(settings)
        .page(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .page({})
        .error(error, done);
    });
  });

  describe('.alias()', function(){
    it('should be able to alias correctly', function(done){
      var msg = helpers.alias();
      test
        .set(settings)
        .alias(msg)
        .sends(message(msg))
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ token: 'x' })
        .alias({})
        .error(error, done);
    });
  });

  function message(msg){
    return {
      messages: [
        { body: JSON.stringify(msg.json()) }
      ]
    };
  }
});
