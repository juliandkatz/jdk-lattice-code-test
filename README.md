# Full-Stack Code Test: Lattice

This is a React app with an express backend.  The backend was developed in a TDD-ish style using [supertest](https://github.com/visionmedia/supertest..

### Build and Run

1. You will need to insert a `.env` file containing:

```
API_KEY=putyourapikeyhere
```

in the `./server` directory.  This is not stored in source control as it is a secret.  I can email you mine if you prefer.

2. From the main project directory, run `make install`

3. In one shell, run `make start-server`

4. In another shell, run `make start-client`


The client app will be available on http://localhost:3000

#### Notable Features

- Popular movies displayed on the main page
- Search by query
- Movies by genre, using the dropdown on the right (the field is also searchable.
- Select a movie's header to move to the movie detail page
- Select one of the related movie posters below to move to that movie's page
- Server caches responses for 5 minutes

### Test the server

Run `make test-server` from the project root
