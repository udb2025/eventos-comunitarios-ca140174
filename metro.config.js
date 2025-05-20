// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Asegúrate de que 'cjs' esté incluido en las extensiones de origen
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

// Desactiva la resolución de exports de paquetes inestables
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
