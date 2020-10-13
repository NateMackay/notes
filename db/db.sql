
CREATE TABLE Todo (
  id            SERIAL NOT NULL, 
  item          VARCHAR(255) NOT NULL, 
  priority      INT NOT NULL, 
  date          DATE
);

CREATE TABLE Todo (
  id            SERIAL NOT NULL, 
  item          VARCHAR(255) NOT NULL, 
  priority      INT NOT NULL
);

INSERT INTO Todo (item, priority) VALUES ('Create web app for Accendero', 1);

