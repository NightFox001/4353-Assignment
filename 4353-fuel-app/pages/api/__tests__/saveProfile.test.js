import handler from "../saveProfile";

describe("saveProfile API", () => {
  let req;
  let res;

  const defaultQuery = {
    token: "testToken",
    id: "1",
    fullName: "Tony Stark",
    address1: "10880 Malibu Point",
    address2: "",
    city: "Malibu",
    state: "CA",
    zipcode: "90265",
  };

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        token: "testToken",
        id: "1",
        fullName: "Tony Stark",
        address1: "10880 Malibu Point",
        address2: "",
        city: "Malibu",
        state: "CA",
        zipcode: "90265",
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
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(405);
  });

  describe("Form validation", () => {
    it("Should return 405 if token is invalid/undefined", async () => {
      req.body.token = undefined;
      const response = await handler(req, res);
      expect(res.status).toBeCalledWith(405);
      expect(res.json).toHaveBeenCalled();
    });

    describe("Name Input validation", () => {
      it("Should return 400 if Name is undefined", async () => {
        req.body.fullName = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name is empty string", async () => {
        req.body.fullName = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains only white space", async () => {
        req.body.fullName = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains &", async () => {
        req.body.fullName = "john&smith";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains /", async () => {
        req.body.fullName = "john/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains \\", async () => {
        req.body.fullName = "john\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should not return error if Name contains one name", async () => {
        req.body.fullName = "john";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
          message: "Profile saved to DB",
        });
      });
    });

    describe("City Input validation", () => {
      it("Should return 400 if City is undefined", async () => {
        req.body.fullName = "Tony";
        req.body.city = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City is empty string", async () => {
        req.body.fullName = "Tony";
        req.body.city = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains only white space", async () => {
        req.body.fullName = "Tony";
        req.body.city = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains &", async () => {
        req.body.fullName = "Tony";
        req.body.city = "city&name";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains /", async () => {
        req.body.fullName = "Tony";
        req.body.city = "houston/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains \\", async () => {
        req.body.fullName = "Tony";
        req.body.city = "houston\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });
      it("Should return not return error if name contains a period", async () => {
        req.body.fullName = "Tony";
        req.body.city = "St. Louis";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });
    });

    describe("State Input validation", () => {
      it("Should return 400 if State is undefined", async () => {
        req.body.fullName = "Tony";
        req.body.state = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State is empty string", async () => {
        req.body.fullName = "Tony";
        req.body.state = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains only white space", async () => {
        req.body.fullName = "Tony";
        req.body.state = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains &", async () => {
        req.body.fullName = "Tony";
        req.body.state = "t&";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains /", async () => {
        req.body.fullName = "Tony";
        req.body.state = "t/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains \\", async () => {
        req.body.fullName = "Tony";
        req.body.state = "t\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return not return error by default", async () => {
        req.body.fullName = "Tony";
        // req.body.state = "CA";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ message: "Profile saved to DB" });
      });
    });

    describe("Zipcode Input validation", () => {
      it("Should return 400 if Zipcode is undefined", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode is empty string", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains only white space", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains &", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "5432&";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains /", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "1234/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains letter", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "1234h";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains 4 digits", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "1234";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains 6 digits", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "12345-6";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return not return error if Zipcode contains 9 digits", async () => {
        req.body.fullName = "Tony";
        req.body.address1 = "10880 Malibu Point";
        req.body.zipcode = "12345-6789";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
          message: "Profile saved to DB",
        });
      });
    });

    describe("Address Input validation?", () => {
      it("Should return 400 if Address is undefined", async () => {
        req.body.token = "testToken";
        req.body.fullName = "Tony";
        req.body.address1 = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(405);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Address.",
        });
      });
    });
  });
});
