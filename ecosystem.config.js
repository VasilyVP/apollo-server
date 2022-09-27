module.exports = {
    apps : [{
      name   : "apollo-server",
      script: "./build/index.js",
      //script : "/home/ec2-user/apollo-server/build/app.js"
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production",
      },
      deploy : {
        development : {
           "user" : "ec2-user",
           "host" : ["18.117.216.101"],
           "ref"  : "origin/main",
           "repo" : "git@github.com:Username/repository.git",
           "path" : "/var/www/my-repository",
           "post-deploy" : "npm install"
        }
      }
    }]
  }
  