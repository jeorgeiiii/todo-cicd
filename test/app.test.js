const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  app.reset();
});

describe('Tasks API', () => {
  test('starts empty', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Comprar leche' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Comprar leche' });

    const list = await request(app).get('/tasks');
    expect(list.body.length).toBe(1);
  });

  test('delete a task', async () => {
    const t = await request(app).post('/tasks').send({ title: 'Tarea a borrar' });
    const id = t.body.id;
    const del = await request(app).delete(`/tasks/${id}`);
    expect(del.statusCode).toBe(200);
    expect(del.body).toMatchObject({ id, title: 'Tarea a borrar' });

    const list = await request(app).get('/tasks');
    expect(list.body.length).toBe(0);
  });

  test('metrics endpoint exists', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('todolist_http_requests_total');
  });
});
