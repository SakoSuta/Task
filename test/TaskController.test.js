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

      // console.log(token);
    
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
    });

    it('create tasks error (empty)', async () => {
        
        // console.log(token);

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
  });

  describe('All tests for list all tasks of the logged user', () => {
    it('list all tasks of the logged user', async () => {
      
      // console.log(token);

      const response = await axios.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('All test for update tasks', () => {

  });

  describe('All test for update tasks complet', () => {

  });

  describe('All test for delete tasks', () => {

  });

  describe('All test for get tasks by ID User', () => {

  });
});