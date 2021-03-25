import register from "../register";

describe("Register API", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: "POST",
      query: {
        username: "Ironman",
        password: "iamironman",
      },
    };
    res = {
      status: jest.fn(() => res),
      end: jest.fn(),
      json: jest.fn(),
    };
  });

  it("Should return 405 if method is not POST", async () => {
    req.method = "GET";
    const response = await register(req, res);
    expect(res.status).toBeCalledWith(405);
  });

  it("Should return 400 and message if username is taken", async () => {
    req.query.username = "Ironman";
    const response = await register(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ message: "Username is not available." });
  });

  it("Should return 400 and message if username is undefined", async () => {
    req.query.username = undefined;
    const response = await register(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Username or Password not defined",
    });
  });

  it("Should return 400 and message if password is undefined", async () => {
    req.query.password = undefined;
    const response = await register(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Username or Password not defined",
    });
  });

  it("Should return 200 and message if account is created", async () => {
    req.query.username = "JohnSmithUniqueNameForTesting";
    const response = await register(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ message: "Account Created!" });
  });
});
