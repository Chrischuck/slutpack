#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { runPrompts } = require('../lib/prompts');
const { generateProject } = require('../lib/generator');

program
  .name('slutpack')
  .description('Scaffold a production-ready Expo app with Expo Router and React Query')
  .argument('<project-name>', 'Name of the project to create')
  .action(async (projectName) => {
    try {
      console.log(chalk.blue.bold('\n🚀 Slutpack - Expo App Generator\n'));
      
      // Validate project name
      if (!projectName || !/^[a-z0-9-]+$/i.test(projectName)) {
        console.error(chalk.red('Error: Project name must be alphanumeric with hyphens only'));
        process.exit(1);
      }

      const projectPath = path.resolve(process.cwd(), projectName);
      
      // Check if directory exists
      if (await fs.pathExists(projectPath)) {
        console.error(chalk.red(`Error: Directory "${projectName}" already exists`));
        process.exit(1);
      }

      // Run interactive prompts
      const answers = await runPrompts(projectName);

      // Generate project
      await generateProject(projectPath, answers);

      console.log(chalk.green.bold('\n✅ Project created successfully!\n'));
      console.log(chalk.cyan('Next steps:'));
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white('  npm install'));
      console.log(chalk.white('  npm run ios  # or npm run android\n'));
      
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();

