const fs = require('fs-extra');
const path = require('path');

/**
 * Process template file and replace placeholders
 */
function processTemplate(templatePath, replacements) {
  let content = fs.readFileSync(templatePath, 'utf8');
  
  // Replace all placeholders
  Object.keys(replacements).forEach(key => {
    const placeholder = `{{${key}}}`;
    const value = replacements[key];
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, value);
  });
  
  return content;
}

/**
 * Get all template files recursively
 */
function getTemplateFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getTemplateFiles(filePath, fileList);
    } else if (file.endsWith('.template')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Generate replacements object from answers
 */
function generateReplacements(answers, palette) {
  // Generate permissions JSON
  const permissions = {
    ios: {},
    android: []
  };
  
  if (answers.permissions.includes('camera')) {
    permissions.ios.NSCameraUsageDescription = `This app needs access to camera.`;
    permissions.android.push('android.permission.CAMERA');
  }
  
  if (answers.permissions.includes('microphone')) {
    permissions.ios.NSMicrophoneUsageDescription = `This app needs access to microphone.`;
    permissions.android.push('android.permission.RECORD_AUDIO');
  }
  
  if (answers.permissions.includes('photoLibrary')) {
    permissions.ios.NSPhotoLibraryUsageDescription = `This app needs access to photo library.`;
    permissions.ios.NSPhotoLibraryAddUsageDescription = `This app needs access to save photos.`;
    permissions.android.push('android.permission.READ_EXTERNAL_STORAGE');
    permissions.android.push('android.permission.WRITE_EXTERNAL_STORAGE');
  }
  
  if (answers.permissions.includes('location')) {
    permissions.ios.NSLocationWhenInUseUsageDescription = `This app needs access to location.`;
    permissions.android.push('android.permission.ACCESS_FINE_LOCATION');
    permissions.android.push('android.permission.ACCESS_COARSE_LOCATION');
  }
  
  if (answers.permissions.includes('notifications')) {
    // Notifications don't require explicit permissions in iOS/Android config
  }
  
  // Format iOS infoPlist
  let infoPlist = '        "ITSAppUsesNonExemptEncryption": false';
  const iosKeys = Object.keys(permissions.ios);
  if (iosKeys.length > 0) {
    const iosEntries = iosKeys.map(key => {
      return `        "${key}": "${permissions.ios[key]}"`;
    });
    infoPlist = iosEntries.join(',\n') + ',\n        "ITSAppUsesNonExemptEncryption": false';
  }
  
  // Format Android permissions
  let androidPermissions = '';
  if (permissions.android.length > 0) {
    androidPermissions = permissions.android.map(p => `        "${p}"`).join(',\n');
  }
  
  return {
    APP_NAME: answers.appName,
    APP_SLUG: answers.appSlug,
    BUNDLE_IDENTIFIER: answers.bundleIdentifier,
    PACKAGE_NAME: answers.packageName,
    APPLE_ID: answers.appleId,
    TEAM_ID: answers.teamId,
    EAS_PROJECT_ID: answers.easProjectId || '',
    OWNER: answers.owner || '',
    PRIMARY_COLOR: answers.primaryColor,
    VERSION: answers.version,
    VERSION_CODE: answers.versionCode,
    SUPPORTS_TABLET: answers.supportsTablet ? 'true' : 'false',
    INFO_PLIST: infoPlist,
    ANDROID_PERMISSIONS: androidPermissions,
    PRIMARY_COLOR_BACKGROUND: palette.primary
  };
}

module.exports = { processTemplate, getTemplateFiles, generateReplacements };

