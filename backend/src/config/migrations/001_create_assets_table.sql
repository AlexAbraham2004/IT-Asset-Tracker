CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  serial_number VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  assignee VARCHAR(255),
  checkout_date DATE,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
