USE `portafoliodb`;

DROP procedure IF EXISTS `getCustomers`;
DROP procedure IF EXISTS `getCustomer`;
DROP procedure IF EXISTS `updateCustomer`;
DROP procedure IF EXISTS `deleteCustomer`;

DROP procedure IF EXISTS `getWaiters`;

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

DROP procedure IF EXISTS `getMenuItems`;
DROP procedure IF EXISTS `getMenuItemsImages`; /* Métodos separados pa las imgs pq no pueden ir en JSON */
DROP procedure IF EXISTS `getMenuItem`;
DROP procedure IF EXISTS `getMenuItemImage`;
DROP procedure IF EXISTS `addMenuItem`;
DROP procedure IF EXISTS `updateMenuItem`;
DROP procedure IF EXISTS `deleteMenuItem`;


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




-- WAITERS
DELIMITER $$
CREATE PROCEDURE `getWaiters` ()
BEGIN
	SELECT id,email,username,name,lastName,roleId FROM portafoliodb.Users WHERE roleId = 6;
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
CREATE PROCEDURE `addTable` (IN p_capacity INT)
BEGIN
	INSERT INTO portafoliodb.Tables VALUES (DEFAULT,p_capacity, null, null, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `updateTable` (IN p_id INT, IN p_capacity INT, IN p_customerId INT, IN p_waiterId INT)
BEGIN
	UPDATE portafoliodb.Tables
		SET 
        capacity = p_capacity,
        customerId = p_customerId,
        waiterId = p_waiterId,
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
	SELECT * FROM portafoliodb.Reservations WHERE userId = p_userId AND reservationDate >= CURRENT_DATE();
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






-- MENU

DELIMITER $$
CREATE PROCEDURE `getMenuItems` ()
BEGIN
	SELECT mit.id, mit.name, mit.description, mit.price, mit.isAvailable, mit.categoryId, mitimg.menuImageId, mit.createdAt, mit.updatedAt 
    FROM portafoliodb.MenuItems mit JOIN MenuItemsMenuImages mitimg 
	ON mit.id = mitimg.menuItemId;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getMenuItemsImages` ()
BEGIN
	SELECT mitimg.menuItemId, mitimg.menuImageId, mimg.imagePath
	FROM MenuImages mimg JOIN MenuItemsMenuImages mitimg 
	ON mimg.id = mitimg.menuImageId
	JOIN MenuItems mit ON mit.id = mitimg.menuItemId
	WHERE mit.isAvailable = 1;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getMenuItem` (IN p_id INT)
BEGIN
	SELECT mit.id, mit.name, mit.description, mit.price, mit.isAvailable, mit.categoryId, mitimg.menuImageId, mit.createdAt, mit.updatedAt 
    FROM portafoliodb.MenuItems mit JOIN MenuItemsMenuImages mitimg 
	ON mit.id = mitimg.menuItemId WHERE id = p_id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getMenuItemImage` (IN p_menuItemId INT)
BEGIN
	SELECT mitimg.menuItemId, mitimg.menuImageId, mimg.imagePath
	FROM MenuImages mimg JOIN MenuItemsMenuImages mitimg 
	ON mimg.id = mitimg.menuImageId
	JOIN MenuItems mit ON mit.id = mitimg.menuItemId
	WHERE mit.id = p_menuItemId AND mit.isAvailable = 1;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `addMenuItem` (IN p_name VARCHAR(50), IN p_description VARCHAR(255), IN p_price INT, IN p_isAvailable BOOLEAN, IN p_categoryId INT, IN p_menuImageId INT)
BEGIN
	START TRANSACTION; /*START TRANSACTION se pone para que en caso de error se haga ROLLBACK! COMMIT tb va al final*/
	INSERT INTO portafoliodb.MenuItems VALUES (DEFAULT,p_name, p_description, p_price, p_isAvailable, p_categoryId, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

    /* Tabla intermedia */ 
    INSERT INTO portafoliodb.MenuItemsMenuImages VALUES (LAST_INSERT_ID(), p_menuImageId,CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()); /* Se inserta el ID recien obtenido de MenuItems con LAST_INSERT_ID()*/
	COMMIT;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `updateMenuItem` (IN p_id INT,IN p_name VARCHAR(50), IN p_description VARCHAR(255), IN p_price INT, IN p_isAvailable BOOLEAN, IN p_categoryId INT)
BEGIN
	UPDATE portafoliodb.MenuItems
		SET 
        name = p_name,
        description = p_description,
        price = p_price,
        isAvailable = p_isAvailable,
        categoryId = p_categoryId,
        updatedAt = CURRENT_TIMESTAMP()
    WHERE id = p_id;
END $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `deleteMenuItem` (IN p_id INT)
BEGIN
	/* Para eliminar de la tabla intermedia y de ambas tablas se hacen diferentes cosas.
    Primero las laves foraneas de la intermedia tienen la constraint ON DELETE CASCADE para que cuando por ej elimine los items del
    menu en MenuItems se elimine de la intermedia. La imagen sigue ahi si, por lo tanto se declara una variable antes de eliminar el item
    para que luego se haga el delete a la tabla imagenes*/
	DECLARE imgId INT;
    SET imgId = (SELECT menuImageId FROM MenuItemsMenuImages WHERE menuItemId = p_id);
    
	START TRANSACTION;
	DELETE FROM portafoliodb.MenuItems WHERE id = p_id;
    DELETE FROM portafoliodb.MenuImages WHERE id = imgId;
    COMMIT;
END $$
DELIMITER ;



