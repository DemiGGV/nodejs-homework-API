// Написать unit-тесты для контроллера входа (signup)

//    - ответ должен иметь статус-код 200
//    - в ответе должен возвращаться токен
//    - в ответе должен возвращаться объект user с 2
// полями email и subscription, имеющие тип данных String

const { expect, describe, test } = require("@jest/globals");
const request = require("supertest");
const baseURL = "http://localhost:3000/api/users";

describe("Test the /users/login API path", () => {
  test("'/login' should response the with status 200", async () => {
    const response = await request(baseURL).post("/login").send({
      email: "123@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
    await request(baseURL)
      .post("/logout")
      .set("Authorization", `Bearer ${response.body.token}`);
  });

  test("'/login' response may contain an authorization token", async () => {
    const response = await request(baseURL).post("/login").send({
      email: "123@gmail.com",
      password: "123456",
    });
    expect(response.body.token).toBeDefined();
    await request(baseURL)
      .post("/logout")
      .set("Authorization", `Bearer ${response.body.token}`);
  });

  test("'/current' response should contain propertys 'email' and 'subscription'", async () => {
    const preResponse = await request(baseURL).post("/login").send({
      email: "123@gmail.com",
      password: "123456",
    });
    const response = await request(baseURL)
      .get("/current")
      .set("Authorization", `Bearer ${preResponse.body.token}`);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("subscription");
    await request(baseURL)
      .post("/logout")
      .set("Authorization", `Bearer ${preResponse.body.token}`);
  });
});
