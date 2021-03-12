const quoteHistoryDB = [
    {
        userId: 1,
        quote_id: 11,
        delivery_address : "address!",
        date_requested: "date 1!",
        date_delivered: "date 2!",
        gallons: "gals!",
        rate: "too much!",
        total_price: "really high!"
    },
    {
        userId: 1,
        quote_id: 12,
        delivery_address : "address??",
        date_requested: "date 3!",
        date_delivered: "date 4!",
        gallons: "gals??",
        rate: "too much??",
        total_price: "really high??"
    },
    {
        userId: 1,
        quote_id: 13,
        delivery_address : "address two electric boogaloo",
        date_requested: "date 5!",
        date_delivered: "date 6!",
        gallons: "gals! gals! gals!",
        rate: "too much! or not enough?",
        total_price: "really high! or way to cheap?"
    },
    {
        userId: 1,
        quote_id: 14,
        delivery_address : "address the 4th, awakening",
        date_requested: "date 7!",
        date_delivered: "date 8!",
        gallons: "gals! AND guys!",
        rate: "way to low!",
        total_price: "reasonable despite the rate!"
    }
]

const customerDB = {
    1: {
        id: 1,
        username: "Ironman", 
        password: "iamironman",
        fullName: "Tony Stark",
        address1: "10880 Malibu Point",
        address2: "",
        city: "Malibu",
        state: "CA",
        zipcode: "90265",
     },
    2: {
        id: 2,
        username: "Thor", 
        password: "strongestavenger",
        fullName: "Thor Odinson",
        address1: "1234 rd",
        address2: "",
        city: "Asgard",
        state: "AG",
        zipcode: "11111",
    },
    3: {
        id: 3,
        username: "Spiderman", 
        password: "nowayhome",
        fullName: "Peter Parker",
        address1: "1234 Queens rd",
        address2: "",
        city: "New York City",
        state: "NY",
        zipcode: "12345",
    },
}

module.exports = {quoteHistoryDB, customerDB}