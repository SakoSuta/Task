const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3000/auth";
axios.defaults.headers.common["Content-Type"] = "application/json";

describe("All test for register", () => {

  test("register succes", async () => {
      const res = await axios.post("/register", {
      email:"mimidevel.me@gmail.com",
      name:"qzdqdssvxcqdzd",
      password:"Azerty1234",
      });

      expect(res.status).toEqual(201);
      expect(res.data).toBeInstanceOf(Object);
      expect(res.data).toHaveProperty("message");
  });

  test("register credentials error (empty)", async () => {
    try {
      const res = await axios.post("/register", {
      email:"",
      name:"",
      password:"",
      });
    } catch (e) {
      expect(e.response.status).toEqual(400);
      expect(e.response.data).toBeInstanceOf(Object);
      expect(e.response.data).toHaveProperty("error");
    }
  });

  test("register credentials error (password)", async () => {
    try {
      const res = await axios.post("/register", {
      email:"Glacon@gmail.com",
      name:"GlaconJPG",
      password:"123",
      });
    } catch (e) {
      expect(e.response.status).toEqual(400);
      expect(e.response.data).toBeInstanceOf(Object);
      expect(e.response.data).toHaveProperty("error");
    }
  });

  test("register credentials error (already existe)", async () => {
    try {
      const res = await axios.post("/register", {
      email:"mimidevel.me@gmail.com",
      name:"qzdqdssvxcqdzd",
      password:"Azerty1234",
      });
    } catch (e) {
      expect(e.response.status).toEqual(400);
      expect(e.response.data).toBeInstanceOf(Object);
      expect(e.response.data).toHaveProperty("error");
    }
  });

});

describe("All test for login", () => {  

  test("login success", async () => {
    const res = await axios.post("/login", {
      email: "mimidevel@gmail.com",
      password: "Azerty1234",
    });
    
    expect(res.status).toEqual(200);
    expect(res.data).toBeInstanceOf(Object);
    expect(res.data).toHaveProperty("message");
    expect(res.data).toHaveProperty("token");
  });

  test("login credentials error (email)", async () => {
    try {
      const res = await axios.post("/login", {
        email: "glacon@gmail.com",
        password: "Azerty1234",
      });
    } catch (e) {
      expect(e.response.status).toEqual(401);
      expect(e.response.data).toBeInstanceOf(Object);
      expect(e.response.data).toHaveProperty("error");
    }
  });

  test("login credentials error (password)", async () => {
    try {
      const res = await axios.post("/login", {
        email: "mimidevel@gmail.com",
        password: "Azerty1234",
      });
    } catch (e) {
      expect(e.response.status).toEqual(401);
      expect(e.response.data).toBeInstanceOf(Object);
      expect(e.response.data).toHaveProperty("error");
    }
  });


});