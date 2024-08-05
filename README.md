
# Book Rental Application

## Overview

The Book Rental Application is a full-stack project that allows users to rent books, upload books for rent, and manage book rentals. It includes dashboards for book owners and system admins, and implements access control using CASL. The application is built with Next.js or React.js for the frontend, Node.js for the backend, and PostgreSQL for the database.

![Company Logo](image.png)

## Features

- **User Roles:**
  - **Book Renters:** Browse and rent books.
  - **Book Owners:** Upload, update, and remove books; view revenue.
  - **System Admins:** Manage book owners, approve books, and view statistics.

- **Access Control:** Implemented using CASL to manage permissions and access to resources.

- **UI Components:** Built with Material UI and Material React Table for a modular and responsive design.

- **Authentication:** JWT-based authentication for secure access.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- PostgreSQL (>=12.x)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Ammen1/Book-Rental-Application
   cd book-rental-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/book_rental_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Database Migrations**

   Ensure that you have configured your database and run the migrations:

   ```bash
   npx prisma migrate deploy
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   npm run start:server
   ```

2. **Start the Frontend Server**

   ```bash
   npm run dev
   ```

3. **Access the Application**

   Open your browser and navigate to `http://localhost:3000` to access the application.


4. **Access the Application**

+----------------+       +----------------+       +----------------+       +----------------+
|     User       |       |      Book       |       |    Rental      |       |   Category     |
+----------------+       +----------------+       +----------------+       +----------------+
| id (PK)        |       | id (PK)         |       | id (PK)        |       | id (PK)        |
| email           |       | title          |       | bookId (FK)    |       | name           |
| password        |       | author         |       | renterId (FK)  |       +----------------+
| role            |       | categoryId (FK)|       | startDate      |       
| createdAt       |       | ownerId (FK)   |       | endDate        |       
| updatedAt       |       | quantity       |       | returnDate     |       
+----------------+       | available      |       | amount         |       
      |                 | createdAt      |       | createdAt      |       
      |                 | updatedAt      |       | updatedAt      |       
      |                 +----------------+       +----------------+       
      |                         |                   
      |                         |                   
      |                         |                   
      |                         |                   
      |                         |                   
      |                 +----------------+       
      |                 |     Category   |       
      |                 +----------------+       
      |                   
      +-----------------<   owns   >------------------->+        
                        |                           |   
                        +---------------------------+    


### API Endpoints

- **Authentication:**
  - `POST /api/auth/login` - Authenticate and receive a JWT token.
  - `POST /api/auth/register` - Register a new user.

- **Books:**
  - `GET /api/books` - List all books.
  - `POST /api/books` - Upload a new book (Owner role required).
  - `PUT /api/books/:id` - Update book information (Owner role required).
  - `DELETE /api/books/:id` - Remove a book (Owner role required).

- **Rentals:**
  - `POST /api/rentals` - Rent a book.
  - `PUT /api/rentals/:id` - Return a rented book.

- **Admin Actions:**
  - `GET /api/admin/owners` - List all book owners.
  - `PUT /api/admin/owners/:id/disable` - Disable a book owner.
  - `GET /api/admin/books` - List all books and their statuses.

### Frontend Components

- **Dashboard:** Separate dashboards for book owners and system admins.
- **Material UI:** Used for styling and responsive design.
- **Material React Table:** Used for displaying and managing lists with server-side filtering.

### Contribution

1. **Fork the Repository**

   Click the "Fork" button on the top right of the repository page to create your own copy.

2. **Create a Branch**

   ```bash
   git checkout -b your-branch-name
   ```

3. **Make Changes**

   Implement your changes and ensure they are properly tested.

4. **Commit and Push**

   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin your-branch-name
   ```

5. **Create a Pull Request**

   Go to the original repository and create a pull request to merge your changes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


