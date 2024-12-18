const createProxyServer = require('portaligner');

// Define your port mappings
const portMappings = {
    8080: 'http://127.0.0.1:8080',
    5000: 'http://127.0.0.1:5000'
    // Add more port mappings
};

// Create the proxy server
const server = createProxyServer({
    portMappings, // Optional: specify your port mappings
    proxyPort: 3003, // Optional: defaults to 3003 if not specified
    logFilePath: 'requests.log' // Optional: custom log file path
});
