<h1 align="center" style="font-weight: bold;">Task Manager 📝</h1>

<p align="center">
• <a href="#started">Getting Started</a> • 
<a href="#routes">API Endpoints</a> •
<a href="#testing">Testing</a> •
</p>

<p align="center">
    <b>A Restful API for managing tasks, enabling users to create, Update, Delete, and view tasks.</b>
</p>

<h2 id="started">🚀 Getting Started</h2>

<p>Follow the steps below to run the project locally:</p>

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/airtribe-projects/task-manager-api-Sharifa26
```

<h3>Starting</h3>

install dependencies

```bash
npm install
```

run the project in production mode

```bash
npm start
```

run the project in development mode

```bash
npm run dev
```

---


<h2 id="routes">📍 API Endpoints</h2>

The API will be available by default on `http://localhost:3000`

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /api/v1/tasks</kbd>     | get all the tasks see [request details](#get-api-v1-tasks-detail)
| <kbd>GET /api/v1/tasks/:id</kbd>     | get a task by id see [request details](#get-api-v1-tasks-id-detail)
| <kbd>GET /api/v1/tasks/priority/:level</kbd>     | get all the tasks by priority see [request details](#get-api-v1-tasks-priority-level-detail)
| <kbd>POST /api/v1/tasks</kbd>     | create a new task see [request details](#post-api-v1-tasks-detail)
| <kbd>PUT /api/v1/tasks/:id</kbd>     | update a task see [request details](#put-api-v1-tasks-id-detail)
| <kbd>PATCH /api/v1/tasks/:id</kbd>     | partially update a task see [request details](#patch-api-v1-tasks-id-detail)
| <kbd>DELETE /api/v1/tasks/:id</kbd>     | delete a task see [request details](#delete-api-v1-tasks-id-detail)

---
<h3 id="get-api-v1-tasks-detail">GET /api/v1/tasks</h3>

<h4>Description:<h4> 

Get all tasks with optional pagination.

<h4>Query Parameters:</h4>


| Parameter | Type | Description | Example |
| --------- | ---- | ----------- | ------- |
| limit     | number | Number of tasks to return | 5 |
| offset    | number | Number of tasks to skip | 0 |


<h4>Response:</h4>

| Status Code | Description | Response Body |
| ----------- | ----------- | ------------- |
| 200 OK      | Returns an array of tasks | Array of task objects |
| 500         | Server error | Error message |

**CURL**
```bash
curl --location 'http://localhost:3000/api/v1/tasks/?limit=5&offset=11'

```
---

<h3 id="get-api-v1-tasks-id-detail">GET /api/v1/tasks/:id</h3>

<h4>Description:<h4>
Get a task by its ID.

<h4>Parameters:</h4>

|Parameter	|Type	|Description	|Example|
|-----------|------|-------------|-------|
|id	|number	|ID of the task	|5|


<h4>Response:</h4>

|Status Code	|Description	|Response Body|
|-------------|-------------|-------------|
|200 OK	|Returns the task object	|Task object|
|404 Not Found	|Task not found	|Error message|
|500 Internal Server Error	|Server error	|Error message|

**CURL**
```bash
curl --location 'http://localhost:3000/api/v1/tasks/8'

```
---

<h3 id="get-api-v1-tasks-priority-level-detail">GET /api/v1/tasks/priority/:level</h3>
<h4>Description:<h4>
Get all tasks by priority level.

<h4>Parameters:</h4>

|Parameter	|Type	|Description	|Example|
|-----------|------|-------------|-------|
|level	|string	|Priority level	|low|

<h4>Response:</h4>

|Status Code	|Description	|Response Body|
|-------------|-------------|-------------|
|200 OK	|Returns an array of tasks	|Array of task objects|
|404 Not Found	|Task not found	|Error message|
|500 Internal Server Error	|Server error	|Error message|

**CURL**
```bash
curl --location 'http://localhost:3000/api/v1/tasks/priority/low'
```
---

<h3 id="post-api-v1-tasks-detail">POST /api/v1/tasks</h3>

<h4>Description:<h4>
Create a new task.

<h4>Request Body:</h4>

|Parameter	|Type	|Description	|Example|
|-----------|------|-------------|-------|
|title	|string	|Title of the task	|Write API documentation|
|description	|string	|Description of the task	|Prepare full Swagger docs for the tasks API|
|completed	|boolean	|Whether the task is completed	|false|
|priority	|string	|Priority level	|low|

<h4>Response:</h4>

|Status Code	|Description	|Response Body|
|-------------|-------------|-------------|
|201 Created	|Returns the created task object	|Task object|
|400 Bad Request	|Invalid request body	|Error message|
|500 Internal Server Error	|Server error	|Error message|

**CURL**

```bash
curl --location 'http://localhost:3000/api/v1/tasks/' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Write API documentation",
  "description": "Prepare full Swagger docs for the tasks API",
  "completed": false,
  "priority":"low"
}
'
```
---

<h3 id="put-api-v1-tasks-id-detail">PUT /api/v1/tasks/:id</h3>

<h4>Description:<h4>
Update a task.

<h4>Request Body:</h4>

|Parameter	|Type	|Description	|Example|
|-----------|------|-------------|-------|
|title	|string	|Title of the task	|Write API documentation|
|description	|string	|Description of the task	|Prepare full Swagger docs for the tasks API|
|completed	|boolean	|Whether the task is completed	|false|
|priority	|string	|Priority level	|low|

<h4>Response:</h4>

|Status Code	|Description	|Response Body|
|-------------|-------------|-------------|
|200 OK	|Returns the updated task object	|Task object|
|400 Bad Request	|Invalid request body	|Error message|
|404 Not Found	|Task not found	|Error message|
|500 Internal Server Error	|Server error	|Error message|

**CURL**

```bash
curl --location --request PUT 'http://localhost:3000/api/v1/tasks/16' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Write API documentation",
  "description": "Prepare full Swagger docs for the tasks API",
  "completed": true,
  "priority":"high"
}
'
```
---

<h3 id="patch-api-v1-tasks-id-detail">PATCH /api/v1/tasks/:id</h3>

<h4>Description:<h4>
Partially update a task.

<h4>Request Body:</h4>

|Parameter	|Type	|Description	|Example|
|-----------|------|-------------|-------|
|completed	|boolean	|Whether the task is completed	|false|

<h4>Response:</h4>

|Status Code	|Description	|Response Body|
|-------------|-------------|-------------|
|200 OK	|Returns the updated task object	|Task object|
|400 Bad Request	|Invalid request body	|Error message|
|404 Not Found	|Task not found	|Error message|
|500 Internal Server Error	|Server error	|Error message|

**CURL**
```bash
curl --location --request PATCH 'http://localhost:3000/api/v1/tasks/5' \
--header 'Content-Type: application/json' \
--data '{
  "completed": false
}
'
```
---

<h3 id="delete-api-v1-tasks-id-detail">DELETE /api/v1/tasks/:id</h3>

<h4>Description:<h4>
Delete a task.

<h4>Response:</h4>

|Status Code	|Description	|Response Body|
|-------------|-------------|-------------|
|200 OK	|Returns the deleted task object	|Task object|
|404 Not Found	|Task not found	|Error message|
|500 Internal Server Error	|Server error	|Error message|

**CURL**

```bash
curl --location --request DELETE 'http://localhost:3000/api/v1/tasks/16'
'
```

---

## 🧪 Testing

To ensure your API works as expected, writing and running **automated tests** is essential. Below is how to run tests and sample test cases you should implement using **Supertest** for HTTP assertions.

### How to Run Tests

1. Ensure you have your development environment ready (`npm install` done).
2. Tests should use **Supertest** along with your preferred test framework.
3. Run tests with:

```bash
# Run all tests without coverage
npm run test

# Run all tests with coverage
npm run test:coverage
```


---

<h3 id="testing">Sample Test Cases</h3>

Here are some common API tests to verify endpoints work correctly using **Supertest**.

#### 1. **GET /api/v1/tasks**

- Should return a list of tasks (status 200).
- Should respect `limit` and `offset` query parameters.
- Should return an empty array if no tasks are available.

#### 2. **GET /api/v1/tasks/:id**

- Should return the task with given ID (status 200).
- Should return 404 if task ID does not exist.

#### 3. **GET /api/v1/tasks/priority/:level**

- Should return tasks matching the given priority (case insensitive).
- Should return 400 or 404 for invalid priority level.

#### 4. **POST /api/v1/tasks**

- Should create a task with valid body (status 201).
- Should validate required fields (`title`, `priority`).
- Should reject invalid data (status 400).

#### 5. **PUT /api/v1/tasks/:id**

- Should fully update an existing task (status 200).
- Should return 404 for non-existent task ID.
- Should reject invalid update payload (validation).

#### 6. **PATCH /api/v1/tasks/:id**

- Should partially update fields of a task.
- Should return 404 if task not found.
- Should reject invalid partial data.

#### 7. **DELETE /api/v1/tasks/:id**

- Should delete given task (status 204 or 200).
- Should return 404 if task does not exist.

---


### Notes

- The Data is stored in a local JSON file. 
- When ever you make changes to the data it will be saved in the JSON file.






<p align="center">Made with ❤️ by Sharifa</p>


