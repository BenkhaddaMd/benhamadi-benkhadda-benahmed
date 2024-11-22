# Spring Boot and React Party Management Application

This is an application for managing parties, participants, and reviews using a Spring Boot backend. The backend provides REST APIs for managing users, parties, participants, and reviews.

---

## Features

- **User Authentication** (Signup, Signin) with JWT.
- **Manage Parties** (Create, Update, View, Delete).
- **Manage Participants** for each party (Join, Leave, View Participants).
- **Review Parties and Users**.

---

## Technologies Used

- **Backend**: Spring Boot, Spring Security, JPA, Hibernate, H2 Database (for demo purposes).
- **Security**: JSON Web Token (JWT) for authentication.

---

## Database Optimization

### SQL Schema for `party` Table

```sql
CREATE TABLE party (
    id SERIAL,
    address_id INT,
    date_time TIMESTAMP NOT NULL,
    available_places INT NOT NULL,
    is_paid BOOLEAN NOT NULL,
    price NUMERIC,
    description TEXT,
    organizer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id, date_time)
) PARTITION BY RANGE (date_time);

CREATE TABLE party_2023 PARTITION OF party
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE party_2024 PARTITION OF party
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE INDEX idx_party_date_time_2023 ON party_2023 (date_time);
```

---

### Explanation

- **Partitioning**:
    - The `party` table is partitioned by `date_time` using a **RANGE** strategy.
    - Each partition contains rows for a specific year:
        - `party_2023` stores parties for 2023.
        - `party_2024` stores parties for 2024.
    - Partitioning allows the database to scan only relevant partitions for queries, improving performance.

- **Indexing**:
    - An index `idx_party_date_time_2023` is created on the `party_2023` partition.
    - This speeds up queries that filter by `date_time` within this partition.

- **Scalability**:
    - New partitions can be added as needed, e.g., for 2025, ensuring efficient management of growing data.
