const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');
http.createServer(app);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
