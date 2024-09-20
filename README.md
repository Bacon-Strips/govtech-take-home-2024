# Football Championship Web App

This is a web application designed to track football championship results and team rankings. The app consists of a **frontend** built with **Vite (React)**, a **backend** built with **Express (Node.js)**, and a **MongoDB** database for persistent data storage. The project is fully containerized using **Docker** and orchestrated with **Docker Compose** for easy setup.

## Prerequisites

Before you start, ensure that you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Environment Variables

You need to create a `.env` file in the root directory to store your MongoDB credentials and URI. Here's an example:

```bash
MONGO_INITDB_ROOT_USERNAME=mongoadmin
MONGO_INITDB_ROOT_PASSWORD=secret
MONGO_URI=mongodb://mongoadmin:secret@mongo:27017
JWT_SECRET=your_jwt_secret
```

## How to run the App
1. Clone the Repository
```bash
git clone https://github.com/yourusername/football-championship-webapp.git
cd football-championship-webapp
```
2. Create a `.env` file in the root directory
3. Build and run the application using `docker-compose -f .\docker-compose.dev.yml up --build`

## Tech stack
- **Frontend**: Developed with Vite (React)
- **Backend**: Built with **Express.js** and connected to **MongoDB**
- **Deployment**: Docker for containerization and deployment 

