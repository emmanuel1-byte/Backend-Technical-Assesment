# Product Catalog API

A RESTful API for managing a product catalog with CRUD operations, search functionality, unit testing, and CI/CD integration.

This project was built as part of a Backend Engineer Technical Assessment.

---

## Features

* Create, Read, Update, and Delete products (name, price, stock)
* Search products by name
* RESTful structure and error handling
* Unit tests with Jest
* API documentation with Postman Collection
* Continuous Integration (CI) and Deployment workflows with GitHub Actions

---

## Tech Stack

* Node.js
* Express.js
* Jest
* Postman (for documentation & testing)
* GitHub Actions (CI/CD pipelines)

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=<your-database-url>
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Start in production mode:

```bash
npm start
```

---

## Testing

Run all unit tests:

```bash
npm test
```

Run with coverage:

```bash
npm run test:coverage
```

---

## API Documentation

The API is documented with a Postman Collection.

Postman Collection: [View Here](your-postman-link)


## CI/CD

This project includes two GitHub Actions workflows:

1. **CI Workflow**

   * Runs tests on every push and pull request
   * Ensures code quality before merging

2. **Deploy Workflow**

   * Builds and deploys the application
   * Triggered on successful merges to the main branch

Workflow files are located in `.github/workflows/`.

---

## Assumptions

* Products are stored in a relational database (configurable via `MONGO_URI`).
* Search endpoint only supports searching by product name.
* Frontend is not included (backend-only service).

---


