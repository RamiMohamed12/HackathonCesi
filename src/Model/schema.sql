-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rides Table (Updated)
CREATE TABLE rides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startpoint VARCHAR(100) NOT NULL,  -- Renamed from departure
    destination VARCHAR(100) NOT NULL,
    dateTime DATETIME NOT NULL,
    availableSeats INT NOT NULL CHECK (availableSeats > 0),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    ride_type ENUM('Bus', 'Car', 'Metro', 'Train') NOT NULL,
    phone VARCHAR(10) NOT NULL,  -- Added phone number field
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ride_id INT NOT NULL,
    booked_seats INT NOT NULL CHECK (booked_seats > 0),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE
);

