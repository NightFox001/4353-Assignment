/*
    Stores a unique integer id numbered 1-50 for each two-letter state code.
    Ordered based on the date each state joined the union (easily extendable without
        re-organizing if/whenever a new state joins, as DC might do soon).
*/
CREATE TABLE states(
    state_id INTEGER NOT NULL UNIQUE,
    state_code CHARACTER(2) NOT NULL UNIQUE
);

/*
    Stores all necessary client information and a unique integer id for each client to serve as the primary key.
    For simplicity in this assignment/project, the client_id is a serial integer
*/
CREATE TABLE client_information(
    client_id SERIAL INTEGER NOT NULL,
    client_name VARCHAR(50) NOT NULL,
    client_address1 VARCHAR(100) NOT NULL,
    client_address2 VARCHAR(100),
    client_city VARCHAR(100) NOT NULL,
    client_state INTEGER NOT NULL,
    client_zipcode VARCHAR(9) NOT NULL,

    PRIMARY KEY(client_id),
    FOREIGN KEY(client_state) REFERENCES states(state_id),
    CONSTRAINT zipcode_length_check CHECK (length(client_zipcode) >=5)
);

/*
    Stores the hashed user credentials for login authentication associated client_id.
    If client information is deleted, their credentials are also deleted.
*/
CREATE TABLE user_credentials(
    client_id INTEGER NOT NULL,
    credentials CHARACTER(64) NOT NULL,
    
    PRIMARY KEY(client_id),
    FOREIGN KEY(client_id) REFERENCES client_information(client_id) ON DELETE CASCADE
);

/*
    Stores fuel quote records from each client.
    Each quote has a unique quote id, which is a serial integer for simplicity in this assignment/project.
    Each quote also has the associated client_id, the number of gallons requested, the rate ($/gallon), and the delivery date.
    The delivery address also stored for each quote using delivery versions of the address fields in client_information.
        This ensures that accurate records are stored for past quotes that were delivered to different addresses.
*/
CREATE TABLE fuelquote(
    quote_id SERIAL INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    gallons INTEGER NOT NULL,
    rate NUMERIC(5,2) NOT NULL,
    delivery_date DATE NOT NULL,
    delivery_address1 VARCHAR(100) NOT NULL,
    delivery_address2 VARCHAR(100),
    delivery_city VARCHAR(100) NOT NULL,
    delivery_state INTEGER NOT NULL,
    delivery_zipcode VARCHAR(9) NOT NULL,

    PRIMARY KEY(quote_id),
    FOREIGN KEY(client_id) REFERENCES client_information(client_id),
    FOREIGN KEY(delivery_state) REFERENCES states(state_id),
    CONSTRAINT positive_gallons_check CHECK (gallons > 0),
    CONSTRAINT positive_rate_check CHECK (rate >= 0),
    CONSTRAINT zipcode_length_check CHECK (length(client_zipcode) >=5)
);

-- Populate States Table
INSERT INTO states VALUES (1, 'DE');
INSERT INTO states VALUES (2, 'PA');
INSERT INTO states VALUES (3, 'NJ');
INSERT INTO states VALUES (4, 'GA');
INSERT INTO states VALUES (5, 'CT');
INSERT INTO states VALUES (6, 'MA');
INSERT INTO states VALUES (7, 'MD');
INSERT INTO states VALUES (8, 'SC');
INSERT INTO states VALUES (9, 'NH');
INSERT INTO states VALUES (10, 'VA');
INSERT INTO states VALUES (11, 'NY');
INSERT INTO states VALUES (12, 'NC');
INSERT INTO states VALUES (13, 'RI');
INSERT INTO states VALUES (14, 'VT');
INSERT INTO states VALUES (15, 'KY');
INSERT INTO states VALUES (16, 'TN');
INSERT INTO states VALUES (17, 'OH');
INSERT INTO states VALUES (18, 'LA');
INSERT INTO states VALUES (19, 'IN');
INSERT INTO states VALUES (20, 'MS');
INSERT INTO states VALUES (21, 'IL');
INSERT INTO states VALUES (22, 'AL');
INSERT INTO states VALUES (23, 'ME');
INSERT INTO states VALUES (24, 'MO');
INSERT INTO states VALUES (25, 'AR');
INSERT INTO states VALUES (26, 'MI');
INSERT INTO states VALUES (27, 'FL');
INSERT INTO states VALUES (28, 'TX');
INSERT INTO states VALUES (29, 'IA');
INSERT INTO states VALUES (30, 'WI');
INSERT INTO states VALUES (31, 'CA');
INSERT INTO states VALUES (32, 'MN');
INSERT INTO states VALUES (33, 'OR');
INSERT INTO states VALUES (34, 'KS');
INSERT INTO states VALUES (35, 'WV');
INSERT INTO states VALUES (36, 'NV');
INSERT INTO states VALUES (37, 'NE');
INSERT INTO states VALUES (38, 'CO');
INSERT INTO states VALUES (39, 'ND');
INSERT INTO states VALUES (40, 'SD');
INSERT INTO states VALUES (41, 'MT');
INSERT INTO states VALUES (42, 'WA');
INSERT INTO states VALUES (43, 'ID');
INSERT INTO states VALUES (44, 'WY');
INSERT INTO states VALUES (45, 'UT');
INSERT INTO states VALUES (46, 'OK');
INSERT INTO states VALUES (47, 'NM');
INSERT INTO states VALUES (48, 'AZ');
INSERT INTO states VALUES (49, 'HI');
INSERT INTO states VALUES (50, 'AK');