require('dotenv').config()

const exec = require('child_process').exec;
const cmd = 'npm run build';

exec(cmd, {
    cwd: process.env.PROJECT_LOCATION
}, (error, stdout, stderr) => {
    console.log(stdout);
});