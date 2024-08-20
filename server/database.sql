CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the 'BookShelves' table
CREATE TABLE BookShelves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);


-- Create the 'Books' table
CREATE TABLE Books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status VARCHAR(20)CHECK (status IN ('Available', 'Borrowed')),
    publisher VARCHAR(255) NOT NULL,
    publication_year INTEGER NOT NULL,
    date_added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(255),
    old_book BOOLEAN DEFAULT FALSE, 
   bookshelf_id UUID REFERENCES Bookshelves(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);


-- Create the 'Loans' table
CREATE TABLE Loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES Books(id) ON DELETE CASCADE,
    borrower_name VARCHAR(255) NOT NULL,
    loan_date DATE NOT NULL,
    estimated_return_date DATE NOT NULL,
    return_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Create the 'Roles' table
CREATE TABLE Roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL
);

-- Create the 'Users' table
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    photo_profil VARCHAR,
    password VARCHAR(255) NOT NULL,
    default_password BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ,
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);
