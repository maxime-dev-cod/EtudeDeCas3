// ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js", // Remplacez par le chemin de votre script principal
      instances: 3, // Nombre d'instances à démarrer
      exec_mode: "cluster", // Mode cluster pour le scaling
      max_memory_restart: "200M", // Limiter l'utilisation de la mémoire à 200 Mo
      error_file: "./logs/err.log", // Chemin pour le fichier de log des erreurs
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
