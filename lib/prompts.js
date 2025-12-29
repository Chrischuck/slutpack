const inquirer = require('inquirer');
const chalk = require('chalk');

async function runPrompts(projectName) {
  console.log(chalk.blue('Let\'s gather some information about your app...\n'));

  const questions = [
    // App Info
    {
      type: 'input',
      name: 'appName',
      message: 'App Name:',
      default: projectName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      validate: (input) => input.length > 0 || 'App name is required'
    },
    {
      type: 'input',
      name: 'appSlug',
      message: 'App Slug (URL-friendly):',
      default: projectName.toLowerCase().replace(/\s+/g, '-'),
      validate: (input) => /^[a-z0-9-]+$/.test(input) || 'Slug must be lowercase alphanumeric with hyphens'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: '1.0.0',
      validate: (input) => /^\d+\.\d+\.\d+$/.test(input) || 'Version must be in format X.Y.Z'
    },

    // iOS Configuration
    {
      type: 'input',
      name: 'bundleIdentifier',
      message: 'iOS Bundle Identifier (e.g., com.yourcompany.appname):',
      default: `com.${projectName.toLowerCase().replace(/\s+/g, '')}.app`,
      validate: (input) => /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/.test(input) || 'Invalid bundle identifier format'
    },
    {
      type: 'input',
      name: 'appleId',
      message: 'Apple ID (for TestFlight submission):',
      validate: (input) => input.includes('@') || 'Please enter a valid email address'
    },
    {
      type: 'input',
      name: 'teamId',
      message: 'Apple Team ID (10 characters):',
      validate: (input) => /^[A-Z0-9]{10}$/.test(input) || 'Team ID must be 10 alphanumeric characters'
    },
    {
      type: 'confirm',
      name: 'supportsTablet',
      message: 'Support iPad?',
      default: true
    },

    // Android Configuration
    {
      type: 'input',
      name: 'packageName',
      message: 'Android Package Name:',
      default: (answers) => answers.bundleIdentifier,
      validate: (input) => /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/.test(input) || 'Invalid package name format'
    },
    {
      type: 'input',
      name: 'versionCode',
      message: 'Android Version Code:',
      default: '1',
      validate: (input) => /^\d+$/.test(input) || 'Version code must be a number'
    },

    // EAS Configuration
    {
      type: 'input',
      name: 'easProjectId',
      message: 'EAS Project ID (UUID, leave empty to generate later):',
      default: '',
      validate: (input) => {
        if (!input) return true;
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input) || 'Invalid UUID format'
      }
    },
    {
      type: 'input',
      name: 'owner',
      message: 'EAS Owner (username or organization):',
      default: ''
    },

    // Theming
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary Color (hex, e.g., #2563eb):',
      default: '#2563eb',
      validate: (input) => /^#[0-9A-Fa-f]{6}$/.test(input) || 'Invalid hex color format'
    },

    // Permissions
    {
      type: 'checkbox',
      name: 'permissions',
      message: 'Select permissions needed:',
      choices: [
        { name: 'Camera', value: 'camera' },
        { name: 'Microphone', value: 'microphone' },
        { name: 'Photo Library', value: 'photoLibrary' },
        { name: 'Location', value: 'location' },
        { name: 'Notifications', value: 'notifications' }
      ],
      default: []
    }
  ];

  const answers = await inquirer.prompt(questions);
  
  return {
    ...answers,
    projectName
  };
}

module.exports = { runPrompts };

