const os = require('os');

const stage = () => {
  console.log(`Stage not provided. Using "local" stage name based on username: 'dev-${os.userInfo().username}'.`);
  return `dev-${os.userInfo().username}`
}

module.exports.userStage = stage
