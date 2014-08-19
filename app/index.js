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

    var prompts = [
/*
      {
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option2?',
        default: true
      },
*/
    ];


    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');


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


