# 🌿 GitHub Server - API Gateway

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)
[![GitHub API](https://img.shields.io/badge/GitHub_API-v4-181717?logo=github)](https://docs.github.com/es/rest)

Servidor API intermediario para el Projecto Github CLient, con caché de respuestas y gestión segura baisca de  tokens. uso de Neon db para el manejo de bases de datos

```mermaid
graph LR
    A[Cliente] --> B{Server}
    B --> C[GitHub API]
    B --> D[(Redis Cache)]
    B --> E[Auth0]