USE `portafoliodb`;
DROP procedure IF EXISTS `getCustomers`;
DROP procedure IF EXISTS `getCustomer`;
DROP procedure IF EXISTS `updateCustomer`;

DELIMITER $$
USE `portafoliodb`$$

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