import { userInfo } from 'os';

const stage = () => {
  console.log(`Stage not provided. Using "local" stage name based on username: 'dev-${os.userInfo().username}'.`);
  return `dev-${userInfo().username}`
}

export const userStage = stage
