const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const id = req.query?.id;
  const fullName = req.query?.fullName;
  const address1 = req.query?.address1;
  const address2 = req.query?.address2;
  const city = req.query?.city;
  const state = req.query?.state;
  const zipcode = req.query?.zipcode;

  const hasId = !!id;
  const hasAddress1 = !!address1 && address1.trim().length > 0;
  const hasAddress2 = !!address2 && address2.trim().length > 0;

  const invalidName =
    !fullName || /[ `!@#$%^&*()_+\-=\[\]{};':."\\|,<>\/?~]/.test(fullName);
  const invalidCity =
    !city?.length > 0 || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(city);
  const invalidState = state?.length !== 2 || !/^[a-zA-Z]+$/.test(state);
  const invalidZipcode = !/\d\d\d\d\d(-\d\d\d\d)?$/.test(zipcode);

  // 'validate' input second time in back-end
  if (!hasId) {
    return res
      .status(400)
      .json({ message: "Id for logged in user not found." });
  }
  if (invalidName)
    return res.status(400).json({ message: "Server Recieved Invalid Name." });

  if (!hasAddress1)
    return res.status(400).json({ message: "Address is required." });
  //   if (!hasAddress2) {} FIX
  //   if (!hasCity) return res.status(400).json({ message: "City is required." });
  if (invalidCity)
    return res.status(400).json({ message: "Server Recieved Invalid City." });
  if (invalidState)
    return res.status(400).json({ message: "Server Recieved Invalid State." });

  if (invalidZipcode)
    return res
      .status(400)
      .json({ message: "Server Recieved Invalid Zipcode." });
  // insert the new values into database for customer with id = id
  return res.status(200).json({ message: "Profile saved to DB" });
};

export default handler;
