import handler from "../login";

describe("Login API", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: "GET",
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

  it("Should return 405 if method is not GET", async () => {
    req.method = "POST";
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(405);
  });

  it("Should return 400 and message if username is not defined", async () => {
    req.query.username = undefined;
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Username or Password not defined",
    });
  });

  it("Should return 400 and message if password is not defined", async () => {
    req.query.password = undefined;
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      message: "Username or Password not defined",
    });
  });

  // it("Should return 200 and id if username and password match", async () => {
  //   const response = await handler(req, res);
  //   expect(res.status).toBeCalledWith(200);
  //   expect(res.json).toBeCalledTimes(1);
  // });

  //   it("Should return 200 and message if username is taken", async () => {
  //     req.query.username = "JohnSmithUniqueNameForTesting";
  //     const response = await register(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ message: "Account Created!" });
  //   });
});
