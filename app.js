const express = require('express');
const client = require('prom-client');

const app = express();
app.use(express.json());

// --- simple in-memory store
let tasks = [];
let nextId = 1;

// --- Prometheus metrics
client.collectDefaultMetrics();
const httpRequestCounter = new client.Counter({
  name: 'todolist_http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method','route','status']
});
const httpRequestDuration = new client.Histogram({
  name: 'todolist_http_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method','route','status']
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.route ? req.route.path : req.path, status: res.statusCode });
    end({ method: req.method, route: req.route ? req.route.path : req.path, status: res.statusCode });
  });
  next();
});

// --- routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = { id: nextId++, title };
  tasks.push(task);
  res.status(201).json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = tasks.splice(idx,1)[0];
  res.json(removed);
});

// metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// helper for tests to reset state
app.reset = () => {
  tasks = [];
  nextId = 1;
};

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

module.exports = app;
