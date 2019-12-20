#!/usr/bin/env node

var inquirer = require("inquirer");
var crossSpawn = require("cross-spawn");
var which = require('which');


inquirer.prompt([
  {
    name: 'action',
    type: 'list',
    message: '请选择要执行的操作：',
    choices: [
      { name: '创建新组件', value: 'component' },
      { name: '创建新模块', value: 'module' },
      { name: '创建新项目', value: 'workspace' }
    ]
  }
]).then(function (answers) {
  var action = answers.action;
  var schema = "esunny-schematics:" + action;
  if (action === 'workspace') {
    const configs = [
      { name: 'name', message: '请输入项目名称' },
      { name: 'prefix', message: '请输入选择器前缀' }
    ];
    generateInquirer('schematics', configs, (answers) =>
      [schema, 
        '--name', answers.name, 
        '--prefix', answers.prefix, 
        '--debug', 'false'
      ]
    ).then(answers => {
      console.log(`
        run:
        cd ${answers.name} && npm i && npm start  
     `)
    })
  }
  else {
    which('ng', (err, command) => {
      child = crossSpawn.spawn(command, ['g', schema], { stdio: 'inherit' });
    })
  }
});

function generateInquirer(command, configs, genArgs) {
  return inquirer.prompt(configs).then(answers => {
    which(command, (err, cmd) => {
     const child =  crossSpawn.spawn(cmd, genArgs(answers), { stdio: 'inherit' })
     if(cb) {
       cb(child);
     }
    })
    return answers;
  })
}
