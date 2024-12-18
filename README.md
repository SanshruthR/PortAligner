# Portaligner - Port Linearizing Proxy Server

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![NPM](https://img.shields.io/badge/NPM-Package-CC3534?style=for-the-badge&logo=npm&logoColor=white)]()
[![Docker](https://img.shields.io/badge/Docker-Enabled-03A9F4?style=for-the-badge&logo=docker&logoColor=white)]()
[![Grafana](https://img.shields.io/badge/Grafana-Integration-F46800?style=for-the-badge&logo=grafana&logoColor=white)]()
[![MIT License](https://img.shields.io/badge/License-MIT-FFEB3B?style=for-the-badge&logo=open-source-initiative&logoColor=303030)]()
[![Build Status](https://img.shields.io/badge/Build-Passing-4CAF50?style=for-the-badge&logo=github&logoColor=white)]()
![screencapture-sanshruthr-grafana-net-d-advanced-http-logs-infinity-portaligner-logs-2024-12-19-00_21_20](https://github.com/user-attachments/assets/90dd14f3-1b5c-4c34-aa2f-82130d1b78fd)



## Overview
Portaligner is a Node.js package designed to linearize requests from multiple ports onto a single port. This is particularly useful for applications that are limited to accepting connections from only one open port, such as those hosted on platforms like Render.

The package sets up a proxy server that listens on one specified port and dynamically routes incoming requests to different services based on the port specified in the URL path. This allows for multiple services to be exposed on different ports but accessed via a single entry point.

## Features
- **Port Mapping:** Maps multiple backend services running on different ports to a single accessible port.
- **Dynamic Proxying:** Redirects requests to the appropriate service based on the URL path.
- **Request Logging:** Logs each request with detailed information such as method, client IP, and response status.
- **Error Handling:** Catches proxy errors and provides meaningful responses while logging errors for debugging.
- **Grafana Integration:** Easily integrates with Grafana for log monitoring and visualization.
- **Docker Support:** Deploy as a Docker container for seamless portability and setup.

## Model Details
The proxy server uses `http`, `http-proxy`, and `url` modules to facilitate routing of requests from various ports to a single proxy port. Additionally, it utilizes the `fs` module to log requests in a file for future reference and troubleshooting.

### How It Works
1. **Port Mapping:** Define port mappings (e.g., port 8080 to http://127.0.0.1:8080).
2. **Proxying:** Requests are routed to the appropriate backend service based on the port specified in the URL path.
3. **Logging:** Each request is logged in a specified log file with details like method, URL, client IP, and response status.
4. **Error Handling:** If a request is made to an invalid port, an error is logged, and a 404 response is returned.
5. **Grafana Monitoring:** Use Grafana to monitor log files and system metrics for enhanced observability.

## Usage

### 1. Install the Package
To use Portaligner, you first need to install it in your Node.js project:

```bash
npm install portaligner
```

### 2. Configure the Proxy Server
Create a JavaScript file (e.g., `app.js`) and require the package:

```javascript
const createProxyServer = require('portaligner');

// Define your port mappings
const portMappings = {
    8080: 'http://127.0.0.1:8080',
    5000: 'http://127.0.0.1:5000'
    // Add more port mappings as needed
};

// Create the proxy server
const server = createProxyServer({
    portMappings, // Optional: specify your port mappings
    proxyPort: 3003, // Optional: defaults to 3003 if not specified
    logFilePath: 'requests.log' // Optional: custom log file path
});
```

### 3. Access the Service
Once the server is running, you can access the mapped services via a single port:

- `http://localhost:3003/8080`
- `http://localhost:3003/5000`
-  `http://localhost:3003/logs`

Each of these URLs will proxy requests to the corresponding service running on the specified ports.

### 4. Deploy with Docker

#### 4.1 Using Docker Container

To deploy Portaligner as a Docker container, follow these steps:

1. Create a `Dockerfile`:
    ```dockerfile
    FROM node:14
    WORKDIR /app
    COPY . .
    RUN npm install
    CMD ["node", "app.js"]
    ```

2. Build the Docker image:
    ```bash
    docker build -t portaligner .
    ```

3. Run the container:
    ```bash
    docker run -p 3003:3003 portaligner
    ```

4. Access the application:
    Open your browser and navigate to `http://localhost:3003`.

---

#### 4.2 Using Node.js Locally

To deploy Portaligner without Docker, you can run it directly using Node.js:

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the application:
    ```bash
    node app.js
    ```

3. Access the application:
    Open your browser and navigate to `http://localhost:3003`.

---

Both methods allow you to deploy and run Portaligner seamlessly. Choose the one that best fits your environment and needs!


### 5. Grafana Integration
- Set up Grafana and configure the log file location as a data source.
- Use dashboards to visualize requests, errors, and system metrics.

## Deployment

### For Applications With Single Port Support (e.g., Render)
Portaligner is useful for apps that only support a single open port for routing traffic (e.g., Render). By using this proxy, you can map multiple backend services running on different ports to a single accessible port, making them available on the same entry point.

## How It Helps
- **Easy Configuration:** Define port mappings in a simple JavaScript object.
- **Proxy Multiple Services:** Expose multiple services behind one open port.
- **Log Requests:** Keep a detailed log of requests for troubleshooting and analytics.
- **Grafana Monitoring:** Monitor logs and metrics using Grafana for improved observability.
- **Docker Compatibility:** Easily deploy with Docker for scalable and portable deployment.
- **Handle Errors Gracefully:** Return meaningful error messages for unhandled requests.

## License
This project is licensed under the MIT License.
