CREATE TABLE refresh_tokens (
  id INT IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  revoked BIT DEFAULT 0
);
