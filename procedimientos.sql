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
        lastName = p_lastName
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
        quantity = p_quantity
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






