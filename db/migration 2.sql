ALTER TABLE users ADD pfp VARCHAR(255) NULL;

DELIMITER $$

CREATE TRIGGER set_random_pfp
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.pfp IS NULL THEN
        SET NEW.pfp = ELT(
            FLOOR(RAND() * 3) + 1,
            'defaultred.png',
            'defaultgreen.png',
            'defaultblue.png'
        );
    END IF;
END$$

DELIMITER ;