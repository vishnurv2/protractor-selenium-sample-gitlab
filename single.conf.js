
username= process.env.LT_USERNAME || "vishnukdas",
accessKey=  process.env.LT_ACCESS_KEY || "40fkQ3JuRlYMzd4ff7uqkqXCTnwvvkEB7FWJz1sLS2qSqoEDal",

exports.config = {
  'specs': ['./specs/single.js'],

  seleniumAddress: 'https://'+ username +':'+ accessKey  +'@hub.lambdatest.com/wd/hub',

  'capabilities': {
    'build': 'protractor-LambdaTest-Single',
    'browserName': 'chrome',
    'version':'88.0',
    'platform': 'WIN10',
    'video': true,
    'network': true,
    'console': true,
    'visual': true
  },
  onPrepare: () => {

    myReporter = {
        specStarted: function(result) {
          specStr= result.id
          spec_id = parseInt(specStr[specStr.length -1])
          browser.getProcessedConfig().then(function (config) {
            var fullName = config.specs[spec_id];
            //var fileName = fullName.substring(fullName.lastIndexOf('/')+1);
            browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
          });
        }
      };
      jasmine.getEnv().addReporter(myReporter);
  },
  onComplete: () => {
    browser.quit();
  }



};
