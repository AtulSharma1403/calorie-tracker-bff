# Calorie Tracker API

A RESTful API for storing and managing user profiles with BMR calculations.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/calorie-tracker
```

3. Start the server:
```bash
npm run dev
```

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add Environment Variables:
   - `PORT`: 3000
   - `MONGODB_URI`: Your MongoDB connection string 

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users

## Example Request Body for Creating User

```json
{
  "name": "James",
  "weight": 75.7,
  "height": 180,
  "gender": "male",
  "dob": "1985-01-01",
  "bmr": 1535.245
}
``` 