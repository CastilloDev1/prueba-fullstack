# Arquitectura del Proyecto

## Componentes

- 3 Microservicios NestJS standalone:
  - usuarios
  - pedidos
  - pagos
- MongoDB con seed automático
- Frontend Angular
- Docker Compose como orquestador

## Comunicación

pedidos → usuarios (REST)
pagos → pedidos (preparado para integración)

## Infraestructura

- Docker multi-stage builds
- Red interna Docker
- Variables de entorno para comunicación entre servicios
- Seed automático usando docker-entrypoint-initdb.d
