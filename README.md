# Calorie Tracker API

A RESTful API for tracking calories, activities, and foods.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
4. Access the API at: `http://localhost:3000`
5. Access API documentation at: `http://localhost:3000/api-docs`

## Environment Variables

Create a `.env` file with:

```
MONGODB_URI=mongodb://localhost:27017/calorie-tracker
PORT=3000
```

## API Documentation

The API is documented using Swagger. You can access the interactive documentation at:
```
http://localhost:3000/api-docs
```

This provides a web interface to explore and test all available endpoints.

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create a new activity

### Foods
- `GET /api/foods/groups` - Get all food groups
- `GET /api/foods/group/:foodGroup` - Get foods by group
- `POST /api/foods/userfood` - Add user food
- `GET /api/foods/userfood` - Get user food

### CSV Import API
- `POST /api/csv/import-food` - Import food data from CSV file
- `POST /api/csv/import-activity` - Import activity data from CSV file

## CSV Import Process

The API includes endpoints to import data from CSV files into the database. The CSV files are located in the `files` directory:

1. `food-calories.csv` - Contains nutritional information about various foods
2. `MET-values.csv` - Contains Metabolic Equivalent of Task (MET) values for different activities

To import the data, simply make a POST request to the respective endpoint:

```bash
# Import food data
curl -X POST http://localhost:3000/api/csv/import-food

# Import activity data
curl -X POST http://localhost:3000/api/csv/import-activity
```

This will parse the CSV files and store the data in the MongoDB database. 
