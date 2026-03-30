// Metro configuration
// React Native (>=0.73) expects the config to extend '@react-native/metro-config'.
// See: https://github.com/react-native-community/template/blob/main/template/metro.config.js

const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

/** @type {import('metro-config').MetroConfig} */
const config = {};

module.exports = mergeConfig(defaultConfig, config);
