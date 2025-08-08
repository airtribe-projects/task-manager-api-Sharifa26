const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");
const server = supertest(app);

tap.test("POST /api/v1/tasks", async (t) => {
  const newTask = {
    title: "New Task",
    description: "New Task Description",
    completed: false,
    priority: "low" 
  };
  const response = await server.post("/api/v1/tasks").send(newTask);
  t.equal(response.status, 201);
  t.end();
});

tap.test("POST /api/v1/tasks with invalid data", async (t) => {
  const newTask = {
    title: "New Task",
  };
  const response = await server.post("/api/v1/tasks").send(newTask);
  t.equal(response.status, 400);
  t.end();
});

tap.test("GET /api/v1/tasks", async (t) => {
  const response = await server.get("/api/v1/tasks");
  t.equal(response.status, 200);
  // Check that result exists and is an array with at least one element
  t.ok(Array.isArray(response.body.result), "result should be an array");
  t.ok(response.body.result.length > 0, "result should have at least one task");

  const task = response.body.result[0];

  t.hasOwnProp(task, "id");
  t.hasOwnProp(task, "title");
  t.hasOwnProp(task, "description");
  t.hasOwnProp(task, "completed");
  t.hasOwnProp(task, "priority");

  t.type(task.id, "number");
  t.type(task.title, "string");
  t.type(task.description, "string");
  t.type(task.completed, "boolean");
  t.type(task.priority, "string");

  t.end();
});

tap.test("GET /api/v1/tasks/:id", async (t) => {
  const response = await server.get("/api/v1/tasks/1");
  t.equal(response.status, 200);
  const expectedTask = {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "high"
  };

  t.match(response.body.result, expectedTask);
  t.end();
});

tap.test("GET /api/v1/tasks/:id with invalid id", async (t) => {
  const response = await server.get("/api/v1/tasks/999");
  t.equal(response.status, 404);
  t.end();
});

tap.test("PUT /api/v1/tasks/:id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
    priority:"medium"
  };
  const response = await server.put("/api/v1/tasks/2").send(updatedTask);
  t.equal(response.status, 200);
  t.end();
});

tap.test("PUT /api/v1/tasks/:id with invalid id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
    priority:"medium"
  };
  const response = await server.put("/api/v1/tasks/999").send(updatedTask);
  t.equal(response.status, 404);
  t.end();
});

tap.test("PUT /api/v1/tasks/:id with invalid data", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: "true",
    priority:"medium"
  };
  const response = await server.put("/api/v1/tasks/2").send(updatedTask);
  t.equal(response.status, 400);
  t.end();
});

tap.test("DELETE /api/v1/tasks/:id", async (t) => {
  const response = await server.delete("/api/v1/tasks/16");
  t.equal(response.status, 200);
  t.end();
});

tap.test("DELETE /api/v1/tasks/:id with invalid id", async (t) => {
  const response = await server.delete("/api/v1/tasks/999");
  t.equal(response.status, 404);
  t.end();
});

tap.test("PATCH /api/v1/tasks/:id", async (t) => {
  const updates = {
    completed: true,
    priority: "high"
  };

  const response = await server.patch("/api/v1/tasks/2").send(updates);

  t.equal(response.status, 200);
  t.equal(response.body.result.completed, true, "completed should be updated to true");
  t.equal(response.body.result.priority, "high", "priority should be updated to 'high'");
  t.end();
});

tap.test("GET /api/v1/tasks/priority/:level", async (t) => {
  const response = await server.get("/api/v1/tasks/priority/medium");

  t.equal(response.status, 200);
  t.ok(Array.isArray(response.body.result), "result should be an array");
  const allMedium = response.body.result.every(task => task.priority === "medium");
  t.ok(allMedium, "all tasks should have priority 'medium'");
  t.end();
});


tap.teardown(() => {
  process.exit(0);
});
