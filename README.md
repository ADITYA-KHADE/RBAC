# Role-Based Access Control (RBAC) UI

## Overview

The **Role-Based Access Control (RBAC) UI** is a full-stack application that allows users to efficiently manage content in a centralized system. It includes features for creating, viewing, updating, and deleting content. The application is designed to be user-friendly, scalable, and visually appealing with a modern UI.

### Key Components:
- **Frontend**: Built using React and Material UI (MUI) for a responsive and intuitive interface.
- **Backend**: Powered by Node.js and Express, providing robust API endpoints for CRUD operations.
- **Database**: MongoDB serves as the database to store and manage content data.


## Features
- **Create Content**: Users can create new content through a simple form interface.
- **View Content**: Displays content in a paginated table with sorting capabilities.
- **Update Content**: Allows users to edit existing content details.
- **Delete Content**: Removes outdated or unnecessary content entries.
- **Material UI Integration**: Provides a consistent and modern design system.
- **Pagination**: Enhances usability for large datasets by displaying content in chunks.


## Major Technical Decisions

1. **Frontend Library**: React was chosen for its component-based architecture and performance. Material UI ensures a modern, consistent, and easily customizable design.
2. **Backend Framework**: Express.js provides a minimal and flexible framework for building RESTful APIs, allowing rapid development.
3. **Database Selection**: MongoDB was selected for its schema flexibility and ability to handle JSON-like data structures efficiently.
4. **Environment Management**: `.env` file is used to manage environment variables like database connection strings and server ports securely.
5. **Build Process**: A single command (`npm run build`) sets up both the frontend and backend, ensuring a seamless deployment pipeline.


## Challenges and Solutions

### 1.Pagination and Sorting
- **Challenge**: Implementing effective pagination and sorting on the website while ensuring it functions correctly with the backend data.

- **Solution**: Used Material UI's Table component and added server-side pagination and sorting algorithms. The backend API was modified to accept query parameters (page, limit, sort) and answer with paginated data.

## Mongodb schema
```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

```

```javascript
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    permissions: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);

```
## Live Project-Link 
```plaintext
https://rbac-hr6d.onrender.com/
```

## Setup Instructions

### 1. Clone the Repository

To get started, clone this repository to your local machine:

```bash
git https://github.com/ADITYA-KHADE/RBAC.git
cd RBAC
```

## 2. Add ENV file 

Create a `.env` file in the root directory of the project and  add the following environment variables:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=your_desired_port_number

```

Replace `your_mongodb_connection_string` and `your_desired_port_number` with your actual MongoDB connection string and desired port number respectively.

## 3. Install Dependencies, built dist folder and start application

run this command at terminal

```bash
npm run build
npm run start
```
