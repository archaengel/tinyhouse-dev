# Tinyhouse Development

![](public/assets/demo-screenshot.png)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

A demo of the site is available at [https://tinyhouse-1134.herokuapp.com/](https://tinyhouse-1134.herokuapp.com/).

This is the development repository for Tinyhouse, a rental marketplace built with [React](), [TypeScript](), [Node](), [GraphQL](), and [MongoDB]().

The documentation for this repository is still being written.

## Getting Started <a name = "getting_started"></a>

### Prerequisites

This application relies on a number of environment variables to set up.

## Setting Up Your Environment Variables

In the `server` directory, we will need to create a `.env` file at `server/.env` with the following shape:

```bash
# server/.env

PORT=9000
DB_USER=<your_db_username>
DB_USER_PASSWORD=<your_db_password>
DB_CLUSTER=<your_db_cluster_name>
PUBLIC_URL=http://localhost:3000
G_CLIENT_ID=<your_oauth_clientid>
G_CLIENT_SECRET=<your_oauth_client_secret>
G_GEOCODE_KEY=<your_google_geocode_id>
SECRET=<some_secret>
NODE_ENV=development
S_SECRET_KEY=<your_stripe_secret>
CLOUDINARY_NAME=<your_cloudinary_bucket_name>
CLOUDINARY_KEY=<your_cloudinary_key>
CLOUDINARY_SECRET=<your_cloudinary_secret>
```

Additionally, we will need to create a `.env` file in the `client` directory at `client/.env` with the following shape:

```bash
# client/.env
REACT_APP_S_PUBLISHABLE_KEY=<your_stripe_publishable_key>
REACT_APP_S_CLIENT_ID=<your_stripe_client_id>
```

> **Note:** When we build our React app, the Create React App scripts simply inline the values of our environment variables in our code at build time. For this reason, **the environment variables in our React app should never be secret.**

# Database Environment Variables

# Google OAuth Environment Variables

# Google Geocode API Environment Variables

# Stripe Environment Variables

# Cloudinary Environment Varibales

## Usage <a name = "usage"></a>
