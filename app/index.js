'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var greeting = chalk.cyan('\n--------------------------------------') +
                  chalk.cyan('\n gulp-sass-typescript') +
                  chalk.cyan('\n--------------------------------------');


var GulpSassTypescriptGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous GulpSassTypescript generator!'));
    console.log(greeting);

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      },{
        name: 'jQuery(v2.1.1)',
        value: 'includeJQuery',
        checked: false
      },{
        name: 'Modernizr(v2.8.2)',
        value: 'includeModernizr',
        checked: false
      }]
    }];


    this.prompt(prompts, function (props) {
      this.appname = props.appname;
      var features = props.features;

      function hasFeature(feat) { return features.indexOf(feat) !== -1; }
      this.includeJQuery = hasFeature('includeJQuery');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');

    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/sass');
    this.mkdir('app/ts');

    this.template('_index.html', 'app/index.html');
    this.template('main.ts', 'app/ts/main.ts');
    this.template('main.js', 'app/scripts/main.js');
    this.template('styles.css', 'app/styles/styles.css');
    this.template('styles.scss', 'app/sass/styles.scss');


    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  gulpfile: function () {
    this.template('gulpfile.js');
  }

});

module.exports = GulpSassTypescriptGenerator;


