# MySQL Database Setup

This folder contains the SQL schema used by Version 2.

## Setup

1. Open MySQL Workbench.
2. Open `schema.sql`.
3. Run the script.
4. Refresh the `airbnb` schema.
5. Confirm that the `houses` and `favourites` tables exist.

If the `airbnb` database and `houses` table already exist, `IF NOT EXISTS` prevents them from being recreated.

## Tables

### houses

Stores the application's house/property data.

### favourites

Stores favourite house IDs.

```text
favourites.houseId → houses.id
```

The relationship uses a foreign key with `ON DELETE CASCADE`, so deleting a house also removes its favourite record.

## Application Configuration

The Node.js application reads MySQL credentials from environment variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=airbnb
```

For deployment, set these values in the hosting platform's environment-variable settings rather than committing them to the repository.
