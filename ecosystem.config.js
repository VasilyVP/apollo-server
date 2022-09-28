module.exports = {
  apps: [{
    name: "apollo-server",
    script: "./build/index.js",
    //script : "/home/ec2-user/apollo-server/build/app.js"
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production",
    },
    /* deploy: {
      development: {
        "user": "ec2-user",
        "host": ["18.117.216.101"],
        "ref": "origin/development",
        "repo": "git@github.com:VasilyVP/apollo-server.git",
        "path": "~/apollo-server",
        "post-deploy": "npm install",
        "pre-setup": "echo 'Pre setup'",
        "post-setup": "echo 'Post setup'",
        "pre-deploy": "pm2 startOrRestart ecosystem.json --env production",
        "post-deploy": "pm2 startOrRestart ecosystem.json --env production",
        "pre-deploy-local": "echo 'This is a local executed command'"
      }
    } */
  }]
}
