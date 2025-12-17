DELIMITER $$

CREATE TRIGGER set_display_name
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.display_name IS NULL THEN
        SET NEW.display_name = NEW.user_name;
    END IF;
END$$

DELIMITER ;