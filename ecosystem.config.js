module.exports = {
  apps: [
    {
      name: 'multidisciplinario-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/multidisciplinario-5-front',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/multidisciplinario-error.log',
      out_file: '/var/log/pm2/multidisciplinario-out.log',
      log_file: '/var/log/pm2/multidisciplinario-combined.log',
      time: true
    }
  ]
};