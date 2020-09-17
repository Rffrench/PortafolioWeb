USE `portafoliodb`;

DROP procedure IF EXISTS `getCustomers`;
DROP procedure IF EXISTS `getCustomer`;
DROP procedure IF EXISTS `updateCustomer`;
DROP procedure IF EXISTS `deleteCustomer`;

DROP procedure IF EXISTS `getProducts`;
DROP procedure IF EXISTS `getProduct`;
DROP procedure IF EXISTS `addProduct`;
DROP procedure IF EXISTS `updateProduct`;
DROP procedure IF EXISTS `deleteProduct`;

DROP procedure IF EXISTS `getTables`;
DROP procedure IF EXISTS `getTable`;
DROP procedure IF EXISTS `addTable`;
DROP procedure IF EXISTS `updateTable`;
DROP procedure IF EXISTS `deleteTable`;

DROP procedure IF EXISTS `getReservations`;
DROP procedure IF EXISTS `getReservation`;
DROP procedure IF EXISTS `addReservation`;
DROP procedure IF EXISTS `cancelReservation`;

DELIMITER $$
USE `portafoliodb`$$

-- CLIENTES

DELIMITER $$
CREATE PROCEDURE `getCustomers` ()
BEGIN
	SELECT id,email,username,name,lastName,roleId FROM portafoliodb.Users WHERE roleId = 1;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getCustomer` (IN p_id INT)
BEGIN
	SELECT id,email,username,name,lastName,roleId FROM portafoliodb.Users WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `updateCustomer` (IN p_id INT,IN p_email VARCHAR(255), IN p_name VARCHAR(255), IN p_lastName VARCHAR(255))
BEGIN
	UPDATE portafoliodb.Users
		SET 
        email = p_email,
        name = p_name,
        lastName = p_lastName,
        updatedAt = CURRENT_TIMESTAMP()
    WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `deleteCustomer` (IN p_id INT)
BEGIN
	DELETE FROM portafoliodb.Users
    WHERE id = p_id;
END $$
DELIMITER ;





-- PRODUCTOS

DELIMITER $$
CREATE PROCEDURE `getProducts` ()
BEGIN
	SELECT * FROM portafoliodb.Products;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getProduct` (IN p_id INT)
BEGIN
	SELECT id,name,quantity FROM portafoliodb.Products WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `addProduct` (IN p_name VARCHAR(255), IN p_quantity INT)
BEGIN
	INSERT INTO portafoliodb.Products VALUES (DEFAULT,p_name, p_quantity, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `updateProduct` (IN p_id INT,IN p_name VARCHAR(255), IN p_quantity INT)
BEGIN
	UPDATE portafoliodb.Products
		SET 
        name = p_name,
        quantity = p_quantity,
        updatedAt = CURRENT_TIMESTAMP()
    WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `deleteProduct` (IN p_id INT)
BEGIN
	DELETE FROM portafoliodb.Products
    WHERE id = p_id;
END $$
DELIMITER ;





-- MESAS

DELIMITER $$
CREATE PROCEDURE `getTables` ()
BEGIN
	SELECT * FROM portafoliodb.Tables;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getTable` (IN p_id INT)
BEGIN
	SELECT * FROM portafoliodb.Tables WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `addTable` (IN p_capacity INT, IN p_isAvailable BOOLEAN)
BEGIN
	INSERT INTO portafoliodb.Tables VALUES (DEFAULT,p_capacity, p_isAvailable, null, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `updateTable` (IN p_id INT, IN p_capacity INT, IN p_isAvailable BOOLEAN, IN p_userId INT)
BEGIN
	UPDATE portafoliodb.Tables
		SET 
        capacity = p_capacity,
        isAvailable = p_isAvailable,
        userId = p_userId,
        updatedAt = CURRENT_TIMESTAMP()
    WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `deleteTable` (IN p_id INT)
BEGIN
	DELETE FROM portafoliodb.Tables
    WHERE id = p_id;
END $$
DELIMITER ;






-- RESERVAS

DELIMITER $$
CREATE PROCEDURE `getReservations` ()
BEGIN
	SELECT * FROM portafoliodb.Reservations;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getReservation` (IN p_userId INT)
BEGIN
	SELECT * FROM portafoliodb.Reservations WHERE userId = p_userId AND reservationDate > CURRENT_DATE();
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `addReservation` (IN p_reservationDate DATE, IN p_reservationTime TIME, IN p_party INT, IN p_userId INT)
BEGIN
	INSERT INTO portafoliodb.Reservations VALUES (DEFAULT,p_reservationDate, p_reservationTime, p_party, p_userId, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `cancelReservation` (IN p_id INT)
BEGIN
	DELETE FROM portafoliodb.Reservations
    WHERE id = p_id;
END $$
DELIMITER ;




