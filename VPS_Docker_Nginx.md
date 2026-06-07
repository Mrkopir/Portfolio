# Docker and Nginx Deployment

This project was prepared for deployment on a Linux server using Docker, Docker Compose, and Nginx as a reverse proxy.

## What was done

The portfolio project was separated into two main services:

* frontend application;
* backend API service.

Both parts of the application were containerized with Docker, which makes the project easier to run, deploy, update, and reproduce on another server.

## Frontend containerization

The frontend was prepared to run inside a Docker container.

A separate Docker configuration was created for the frontend application. The container builds the frontend project, installs the required dependencies, creates a production build, and starts the application in production mode.

The frontend service runs inside Docker and is available internally on port `3000`.

## Backend containerization

The backend was also moved into a separate Docker container.

The backend container installs dependencies, builds the server application, and starts it in production mode.

Environment variables are used for sensitive configuration, such as API tokens, chat IDs, allowed origins, ports, and production settings. The `.env` files are not committed to the repository.

The backend service runs inside Docker and is available internally on port `5000`.

## Docker Compose setup

Docker Compose was used to manage the frontend and backend containers together.

The Compose configuration allows both services to be started with a single command. It also defines a shared Docker network so the services can communicate with each other in an isolated environment.

The containers were configured with restart policies, so they can automatically restart after a server reboot or container failure.

## Nginx reverse proxy

Nginx was configured as the public entry point for the application.

Instead of exposing the frontend and backend directly to the internet, Nginx receives incoming HTTP/HTTPS requests and forwards them to the correct internal service.

The reverse proxy configuration separates routes:

* regular website traffic is forwarded to the frontend container;
* API requests are forwarded to the backend container.

This gives a cleaner production architecture and allows all public traffic to go through one controlled entry point.

## HTTPS preparation

The deployment was prepared for HTTPS using Certbot and Nginx.

This allows the project to use SSL certificates and serve the website securely over HTTPS.

## Environment configuration

The project uses environment variables for production configuration.

Sensitive values such as tokens, credentials, API keys, and allowed domains are stored outside of the source code. This keeps secrets out of GitHub and makes the deployment safer.

## Security improvements in deployment

Several basic production security practices were considered during deployment:

* secrets are stored in environment variables;
* `.env` files are excluded from Git;
* Nginx is used as the only public entry point;
* frontend and backend run in isolated Docker containers;
* backend API is separated from the frontend;
* only required ports are intended to be publicly accessible;
* HTTPS support is prepared;
* containers are managed through Docker Compose;
* restart policies are used for better availability.

## Final deployment architecture

```text
Internet
   |
   v
Nginx Reverse Proxy
   |
   |-- Frontend Docker Container
   |
   |-- Backend Docker Container
```

In this architecture, users interact only with Nginx. Nginx then routes traffic to the correct Docker container depending on the request.

This deployment approach makes the project closer to a real production environment and gives practical experience with Docker, reverse proxy configuration, Linux server deployment, and basic infrastructure security.
