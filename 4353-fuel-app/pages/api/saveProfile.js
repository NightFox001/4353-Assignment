
const handler = async (req, res) => {
    const id = req.query?.id
    const fullName = req.query?.fullName
    const address1 = req.query?.address1
    const address2 = req.query?.address2
    const city = req.query?.city
    const state = req.query?.state
    const zipcode = req.query?.zipcode

    const hasId = !!id
    const hasName = !!fullName && fullName.trim().length > 0
    const hasAddress1 = !!address1 && address1.trim().length > 0
    const hasAddress2 = !!address2 && address2.trim().length > 0
    const hasCity = !!city && city.trim().length > 0
    const hasState = !!state && state.trim().length > 0
    const hasZipcode = !!zipcode && zipcode.trim().length > 0

    // 'validate' input second time in back-end
    if (!hasId) { return res.status(400).jason({ message: "Id for logged in user not found."}) }
    if (!hasName) { return res.status(400).jason({ message: "Name is required." }) }
    if (!hasAddress1) { return res.status(400).jason({ message: "Address is required."}) }
    if (!hasAddress2) { address2 = null }
    if (!hasCity) { return res.status(400).jason({ message: "City is required."}) }
    if (!hasState) { return res.status(400).jason({ message: "State is required."}) }        
    if (!hasZipcode) { return res.status(400).jason({ message: "Zipcode is required."}) }
    
    // insert the new values into database for customer with id = id
    return res.status(200).jason({message: "Profile saved to DB"})
}

export default handler