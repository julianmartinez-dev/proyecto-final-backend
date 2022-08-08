import request from "supertest";

import app from "../src/app";

describe("GET /api/productos", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/productos").expect(200);
  });
});

describe("GET /api/carrito", () => {
  it("should return 404 Not found", () => {
    return request(app).get("/api/carrito").expect(404);
  });
});

describe("GET /api/carrito/1/productos", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/carrito/1/productos").expect(200);
  });
});

describe("GET /*/*", () => {
  it("should return 404 Not found", () => {
    return request(app).get("/*").expect(404);
  });
});
