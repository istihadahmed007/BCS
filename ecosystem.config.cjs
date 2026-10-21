module.exports = {
  apps: [
    {
      name: 'bcs-app',
      script: 'server.js',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        NEXT_PUBLIC_APP_URL: 'https://bcs.vartualtutor.com'
      }
    }
  ]
};
