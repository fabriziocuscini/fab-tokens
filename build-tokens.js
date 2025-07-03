import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// Register the tokens-studio transforms with minimal configuration
register(StyleDictionary, {
  excludeParentKeys: true // This handles single-file exports from Tokens Studio Figma plugin
});

async function buildTokens() {
  console.log('Building design tokens...');
  
  try {
    const sd = new StyleDictionary({
      source: ['tokens/tokens.json'],
      preprocessors: ['tokens-studio'], // Only use the official preprocessor
      platforms: {
        js: {
          transformGroup: 'tokens-studio',
          transforms: ['name/camel'], // Use camelCase for JS compatibility
          buildPath: 'build/js/',
          files: [
            {
              destination: 'tokens.js',
              format: 'javascript/es6'
            },
            {
              destination: 'tokens.json',
              format: 'json/flat'
            }
          ]
        },
        css: {
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab'],
          buildPath: 'build/css/',
          files: [
            {
              destination: 'variables.css',
              format: 'css/variables'
            }
          ]
        },
        scss: {
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab'],
          buildPath: 'build/scss/',
          files: [
            {
              destination: '_variables.scss',
              format: 'scss/variables'
            }
          ]
        },
        android: {
          transformGroup: 'tokens-studio',
          buildPath: 'build/android/',
          files: [
            {
              destination: 'colors.xml',
              format: 'android/colors'
            },
            {
              destination: 'dimens.xml',
              format: 'android/dimens'
            },
            {
              destination: 'font_dimens.xml',
              format: 'android/fontDimens'
            }
          ]
        },
        ios: {
          transformGroup: 'tokens-studio',
          buildPath: 'build/ios/',
          files: [
            {
              destination: 'DesignTokens.h',
              format: 'ios/colors.h',
              className: 'DesignTokens'
            },
            {
              destination: 'DesignTokens.m',
              format: 'ios/colors.m',
              className: 'DesignTokens'
            }
          ]
        },
        'ios-swift': {
          transformGroup: 'tokens-studio',
          buildPath: 'build/ios-swift/',
          files: [
            {
              destination: 'DesignTokens.swift',
              format: 'ios-swift/class.swift',
              className: 'DesignTokens'
            }
          ]
        }
      }
    });
    
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
    console.log('✅ Design tokens built successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
  }
}

buildTokens().catch(console.error); 