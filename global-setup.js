// global-setup.js
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const resultsDir = path.resolve(__dirname, 'allure-results');

  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
    console.log('🧹 Cleared existing allure-results folder.');
  } else {
    console.log('📂 No existing allure-results folder to delete.');
  }
};
