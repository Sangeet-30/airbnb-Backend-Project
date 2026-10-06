-- Airbnb MySQL database setup
-- Run this file in MySQL Workbench. It creates the database/tables if they do not already exist.

CREATE DATABASE IF NOT EXISTS airbnb;
USE airbnb;

-- Main houses table used by the application.
CREATE TABLE IF NOT EXISTS houses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  houseName VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  photoUrl TEXT,
  description TEXT
);

-- Favourite houses are now stored in MySQL instead of data/favourite.json.
CREATE TABLE IF NOT EXISTS favourites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  houseId INT NOT NULL,
  UNIQUE KEY unique_house_favourite (houseId),
  CONSTRAINT fk_favourites_house
    FOREIGN KEY (houseId)
    REFERENCES houses(id)
    ON DELETE CASCADE
);

-- Preserve the favourite that existed in the previous JSON file when house 4 exists.
INSERT IGNORE INTO favourites (houseId)
SELECT id FROM houses WHERE id = 4;
