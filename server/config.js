/* eslint no-process-env: 0 */

module.exports = {
  port: process.env.PORT || 8080,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '77f0c1f303d2e8c07120',
  GITHUB_CLIENT_SECRET:
    process.env.GITHUB_CLIENT_SECRET || 'e78b87862c0fd46e50e351ce0307b4eadca9167c',
  JWT_SECRET: process.env.JWT_SECRET || '824hdaueranteuhn',
  USER_AGENT: process.env.USER_AGENT || 'ReactBoilerplate'
};
