-- Users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  user_id Integer PRIMARY KEY ASC,
  email text NOT NULL,
  twitter_handle text,
  name text NOT NULL,
  salt_password NOT NULL,
  role_id NOT NULL,
  gender_id NOT NULL,
  FOREIGN KEY ( role_id ) REFERENCES roles( role_id ),
  FOREIGN KEY ( gender_id ) REFERENCES gender( gender_id )
);

-- Avatar
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE IF NOT EXISTS `avatar` (
  user_id Integer,
  top_color text not null,
  bottom_color text not null,
  top_clothing_id text not null,
  bottom_clothing_id text not null,
  FOREIGN KEY( user_id ) REFERENCES users( user_id )
);

-- Gender
DROP TABLE IF EXISTS `gender`;
CREATE TABLE IF NOT EXISTS `gender` (
  gender_id Integer PRIMARY KEY ASC,
  gender_title text NOT NULL
);
INSERT INTO `gender`( gender_id, gender_title ) VALUES 
  ( 0, 'Male' ),
  ( 1, 'Female' ),
  ( 2, 'Non Binary' ),
  ( 3, 'Genderqueer' ),
  ( 4, 'Asexual' );

-- Client Tokens
DROP TABLE IF EXISTS `users_client_tokens`;
CREATE TABLE IF NOT EXISTS `users_client_tokens` (
  user_id Integer,
  token text NOT NULL,
  FOREIGN KEY ( user_id ) REFERENCES users( user_id )
);
CREATE INDEX `user_idx` on `users_client_tokens` ( `user_id` ASC );

-- Roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  role_id Integer PRIMARY KEY ASC,
  role_title text NOT NULL
);
INSERT INTO `roles` ( role_id, role_title ) VALUES
  ( 0, 'root' ),
  ( 1, 'user' );

-- Data

INSERT INTO `users`( user_id, twitter_handle, email, name, salt_password, role_id, gender_id ) VALUES
  ( 0, 'htmldrum', 'jmeldrum@mshanken.com', 'James Meldrum', '929872838cb9cfe6578e11f0a323438aee5ae7f61d41412d62db72b25dac52019de2d6a355eb2d033336fb70e73f0ec0afeca3ef36dd8a90d83f998fee23b78d', 0, 4 ),
  ( 1, 'punkisnaughty', 'poop', 'Charline Tetiyevsky', '929872838cb9cfe6578e11f0a323438aee5ae7f61d41412d62db72b25dac52019de2d6a355eb2d033336fb70e73f0ec0afeca3ef36dd8a90d83f998fee23b78d', 0, 1 )
