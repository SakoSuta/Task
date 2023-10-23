const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3000/auth";
axios.defaults.headers.common["Content-Type"] = "application/json";

describe("All test for register", () => {
  test("signup succes", async () => {
    try{
      const res = await axios.post("/register", {
      email:"mimidevel.me@gmail.com",
      name:"qzdqdssvxcqdzd",
      password:"Azerty1234",
      });

      expect(res.status).toEqual(201);

    }catch (e) {
      expect(e.response.status).toEqual(400);
    }

  });
});

//   test("signup credentials error (empty)", async () => {
//     try {
//       const res = await axios.post("/signup", {
//       email:"",
//       name:"",
//       password:"",
//       });
//     } catch (e) {
//       expect(e.response.status).toEqual(401);
//       expect(e.response.data).toBeInstanceOf(Object);
//       expect(e.response.data).toHaveProperty("errors");
//     }
//   });

describe("All test for sign in", () => {
  test("login credentials error", async () => {
    try {
      const res = await axios.post("/login", {
        email: "glacon@gmail.com",
        password: "Azerty123",
      });
    } catch (e) {
      expect(e.response.status).toEqual(401);
    }
  });

  test("login success", async () => {
    const res = await axios.post("/login", {
      email: "mimidevel@gmail.com",
      password: "Azerty123",
    });

    expect(res.status).toEqual(200);
  });
});