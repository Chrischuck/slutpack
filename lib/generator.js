const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const { generatePalette, generateColorsFile } = require('./colors');
const { processTemplate, getTemplateFiles, generateReplacements } = require('./templates');

async function generateProject(projectPath, answers) {
  console.log(chalk.blue('Generating project structure...\n'));
  
  // Create project directory
  await fs.ensureDir(projectPath);
  
  // Generate color palette
  const palette = generatePalette(answers.primaryColor);
  
  // Generate replacements
  const replacements = generateReplacements(answers, palette);
  
  // Get template directory
  const templateDir = path.join(__dirname, '..', 'templates');
  
  // Process all template files
  const templateFiles = getTemplateFiles(templateDir);
  
  for (const templateFile of templateFiles) {
    const relativePath = path.relative(templateDir, templateFile);
    let outputPath = relativePath.replace(/\.template$/, '');
    
    // Handle .gitkeep files
    if (outputPath.endsWith('.gitkeep')) {
      outputPath = outputPath.replace('.gitkeep', '.gitkeep');
    }
    
    const fullOutputPath = path.join(projectPath, outputPath);
    
    // Ensure directory exists
    await fs.ensureDir(path.dirname(fullOutputPath));
    
    // Process template (skip .gitkeep files)
    if (templateFile.endsWith('.gitkeep.template')) {
      // Just create empty .gitkeep file
      await fs.writeFile(fullOutputPath, '', 'utf8');
    } else {
      const content = processTemplate(templateFile, replacements);
      await fs.writeFile(fullOutputPath, content, 'utf8');
    }
  }
  
  // Generate colors.ts file
  const colorsContent = generateColorsFile(palette);
  await fs.writeFile(
    path.join(projectPath, 'src/constants/colors.ts'),
    colorsContent,
    'utf8'
  );
  
  // Create .gitignore
  const gitignore = `node_modules/
.expo/
.expo-shared/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo
`;
  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
  
  // Create placeholder assets directory structure
  await fs.ensureDir(path.join(projectPath, 'assets'));
  
  console.log(chalk.green('✓ Project structure created'));
}

module.exports = { generateProject };

