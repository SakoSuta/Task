const axios = require("axios");
const fs = require('fs');

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.debug = true;


describe("All test for Tasks", () => {

  it('For Have Token', async () => {
    const response = await axios.post('/auth/login', {
      email: 'mimidevel.me@gmail.com',
      password: 'Azerty1234',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    
    token = response.data.token;

  });

  describe('All test for create tasks', () => {
    it('create tasks', async () => {
      const response = await axios.post('/tasks/create', {
        body: 'Ma tâche',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      expect(response.status).toBe(201);
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toHaveProperty("message");
      expect(response.data).toHaveProperty("newTask");
      
      const newTask = response.data.newTask;
      taskId = newTask.id;
    });

    it('create tasks error (empty)', async () => {
        try {
          const response = await axios.post('/tasks/create', {
            body: '',
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }catch (e) {
          expect(e.response.status).toEqual(400);
          expect(e.response.data).toBeInstanceOf(Object);
          expect(e.response.data).toHaveProperty("error");
        }
      });
      
    it('User not connected', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        });
      }catch (e) {
        expect(e.response.status).toEqual(401);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });

    it('User Token invalid', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        }, {
          headers: {
            Authorization: `Bearer ${token}invalid`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(403);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
  });

  describe('All tests for list all tasks of the logged user', () => {
    it('list all tasks of the logged user', async () => {
      const response = await axios.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
      
    it('User not connected', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        });
      }catch (e) {
        expect(e.response.status).toEqual(401);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });

    it('User Token invalid', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        }, {
          headers: {
            Authorization: `Bearer ${token}invalid`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(403);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
  });

  describe('All test for update tasks', () => {
    it('update tasks', async () => {
      const response = await axios.put(`/tasks/update/${taskId}`, {
        body: 'Ma tâche Modifier',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toHaveProperty("message");
      expect(response.data).toHaveProperty("updatedTask");
    });

    it('update tasks error (empty)', async () => {
      try {
        const response = await axios.put(`/tasks/update/${taskId}`, {
          body: '',
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(400);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });

    it('update tasks error (not found)', async () => {
      try {
        const response = await axios.put(`/tasks/update/0`, {
          body: 'Ma tâche Modifier',
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(404);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
      
    it('User not connected', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        });
      }catch (e) {
        expect(e.response.status).toEqual(401);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });

    it('User Token invalid', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        }, {
          headers: {
            Authorization: `Bearer ${token}invalid`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(403);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
  });

  describe('All test for update tasks complet', () => {
    it('update tasks complet', async () => {
      const response = await axios.patch(`/tasks/update/${taskId}`, {
        completed: true,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toHaveProperty("message");
      expect(response.data).toHaveProperty("updatedTaskCompleted");
    });

    it('update tasks NO complet', async () => {
      const response = await axios.patch(`/tasks/update/${taskId}`, {
        completed: false,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toHaveProperty("message");
      expect(response.data).toHaveProperty("updatedTaskCompleted");
    });

    it('update tasks complete error (not found)', async () => {
      try {
        const response = await axios.patch(`/tasks/update/0`, {
          completed: true,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(404);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
      
    it('User not connected', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        });
      }catch (e) {
        expect(e.response.status).toEqual(401);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });

    it('User Token invalid', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        }, {
          headers: {
            Authorization: `Bearer ${token}invalid`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(403);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
  });

  describe('All test for delete tasks', () => {
    it('delete tasks', async () => {
      const response = await axios.delete(`/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toHaveProperty("message");
    });
    it('delete tasks error (not found)', async () => {
      try {
        const response = await axios.delete(`/tasks/delete/0`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(404);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
      
    it('User not connected', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        });
      }catch (e) {
        expect(e.response.status).toEqual(401);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });

    it('User Token invalid', async () => {
      try {
        const response = await axios.post('/tasks/create', {
          body: 'Ma tâche',
        }, {
          headers: {
            Authorization: `Bearer ${token}invalid`,
          },
        });
      }catch (e) {
        expect(e.response.status).toEqual(403);
        expect(e.response.data).toBeInstanceOf(Object);
        expect(e.response.data).toHaveProperty("error");
      }
    });
  });
});