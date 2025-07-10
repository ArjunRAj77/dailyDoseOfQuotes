# API Documentation - Daily Dose of Life

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Get All Quotes
**GET** `/quotes`

Returns all quotes in the system.

**Response:**
```json
[
  {
    "id": 1,
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "category": "Philosophy"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### Get Random Quote
**GET** `/quotes/random`

Returns a random quote from the collection.

**Response:**
```json
{
  "id": 5,
  "text": "The way to get started is to quit talking and begin doing.",
  "author": "Walt Disney",
  "category": "Success"
}
```

**Status Codes:**
- `200` - Success
- `404` - No quotes available
- `500` - Server error

---

### Get Quotes by Category
**GET** `/quotes/category/:category`

Returns all quotes matching the specified category.

**Parameters:**
- `category` (string) - The category name (case-insensitive)

**Example:**
```
GET /quotes/category/Philosophy
```

**Response:**
```json
[
  {
    "id": 1,
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs",
    "category": "Philosophy"
  },
  {
    "id": 8,
    "text": "It is during our darkest moments that we must focus to see the light.",
    "author": "Aristotle",
    "category": "Philosophy"
  }
]
```

**Status Codes:**
- `200` - Success (empty array if no matches)
- `500` - Server error

---

### Get Specific Quote
**GET** `/quotes/:id`

Returns a specific quote by ID.

**Parameters:**
- `id` (number) - The quote ID

**Example:**
```
GET /quotes/1
```

**Response:**
```json
{
  "id": 1,
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "category": "Philosophy"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid ID format
- `404` - Quote not found
- `500` - Server error

---

### Create New Quote
**POST** `/quotes`

Creates a new quote in the system.

**Request Body:**
```json
{
  "text": "Your inspiring quote here",
  "author": "Quote Author",
  "category": "Category Name"
}
```

**Response:**
```json
{
  "id": 21,
  "text": "Your inspiring quote here",
  "author": "Quote Author",
  "category": "Category Name"
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Invalid request data
- `500` - Server error

**Validation Rules:**
- `text` - Required, non-empty string
- `author` - Required, non-empty string
- `category` - Required, non-empty string

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "errors": [
    {
      "path": ["field_name"],
      "message": "Validation error message"
    }
  ]
}
```

## Available Categories

The following categories are currently available:

- `Philosophy` - Deep thoughts and wisdom
- `Movies` - Memorable quotes from films
- `Famous People` - Quotes from notable personalities
- `Inspiration` - Motivational quotes
- `Success` - Achievement-focused quotes

## Rate Limiting

Currently, no rate limiting is implemented. This may be added in future versions.

## Authentication

No authentication is required for the current API endpoints.