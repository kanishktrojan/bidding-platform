# Real-time Bidding Platform API

This project implements a comprehensive RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and PostgreSQL. The API supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.

## Features

- User registration and authentication
- Role-based access control
- CRUD operations for auction items
- Real-time bidding using WebSocket (Socket.io)
- Notifications for bids and user actions
- Image upload for auction items
- Search and filter auction items
- Pagination for auction items
- Rate limiting
- Logging
- Password reset functionality

## API Endpoints

### Users

- `POST /users/register` - Register a new user.
- `POST /users/login` - Authenticate a user and return a token.
- `GET /users/profile` - Get the profile of the logged-in user.
- `POST /users/request-password-reset` - Request a password reset.
- `POST /users/reset-password/:token` - Reset the password using a token.

### Items

- `GET /items` - Retrieve all auction items (with pagination).
- `GET /items/:id` - Retrieve a single auction item by ID.
- `POST /items` - Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id` - Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id` - Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids

- `GET /items/:itemId/bids` - Retrieve all bids for a specific item.
- `POST /items/:itemId/bids` - Place a new bid on a specific item. (Authenticated users)

### Notifications

- `GET /notifications` - Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read` - Mark notifications as read.

### WebSocket Events

#### Bidding

- `connection` - Establish a new WebSocket connection.
- `bid` - Place a new bid on an item.
- `update` - Notify all connected clients about a new bid on an item.

#### Notifications

- `notify` - Send notifications to users in real-time.

## Requirements

- Docker and Docker Compose
- Node.js and npm
- PostgreSQL

## Setup

### Using Docker

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/bidding-platform.git
cd bidding-platform
