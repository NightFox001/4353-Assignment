import handler from "../loadQuoteHistory";

describe("Load quote history API", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: "GET",
      query: {
        token: "'testToken'",
        id: "2",
      },
    };
    res = {
      status: jest.fn(() => res),
      end: jest.fn(),
      json: jest.fn(),
    };
  });

  it("Should return 405 error if request method is not GET", async () => {
    req.method = "POST";
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(405);
  });

  it("Should return 405 error if token is not defined", async () => {
    req.query.token = undefined;
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ message: "token undefined" });
  });

  it("Should return 400 error and message if id is not defined", async () => {
    req.query.id = "";
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ message: "ID not defined" });
  });

  it("Should return 404 error and message if no quote history is found", async () => {
    req.query.id = "3";
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ message: "No quote history found" });
  });

  it("Should return 200 and quote history if quote history is found", async () => {
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([
      {
        userId: 2,
        quote_id: 16,
        delivery_address: "1234 rd",
        date_requested: "4/14/2021",
        date_delivered: "5/14/2021",
        gallons: 500,
        rate: 5,
        total_price: 2500,
      },
    ]);
  });
});
