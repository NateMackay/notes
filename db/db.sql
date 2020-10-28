
CREATE TABLE Todo (
  id            SERIAL NOT NULL, 
  item          VARCHAR(255) NOT NULL, 
  priority      INT NOT NULL, 
  date          DATE
);

CREATE TABLE Users (
  id            SERIAL NOT NULL, 
  fname         VARCHAR(32) NOT NULL UNIQUE, 
  lname         VARCHAR(32),
  allowed       boolean,
  phone         VARCHAR(80) NOT NULL
);

INSERT INTO Todo (item, priority) VALUES ('Create web app for Accendero', 1);
-- UPDATE Todo SET priority= WHERE item='';


CREATE TABLE Idaho (
  id            SERIAL NOT NULL, 
  item          VARCHAR(255) NOT NULL, 
  placement     INT, 
  date          DATE, 
  submittedBY   VARCHAR(80), 
  category      INT, 
  checked       BOOLEAN
);

INSERT INTO Idaho (item, date, submittedBy, category)
VALUES ('bed/air mattress', '2020-10-27', 'Nate', 1)
;

