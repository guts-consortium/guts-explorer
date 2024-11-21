---
layout: doc
---

# Quickstart, local testing, and development

To run the GUTS Explorer locally, the source code can be cloned and then run with Docker or in virtual environments on your system.

## Installation

First clone the `guts-explorer` repository and install its submodules in order to have the frontend and backend code available locally:

```
git clone https://github.com/guts-consortium/guts-explorer.git
cd guts-explorer
git submodule update --init --recursive
```

The frontend and backend can then be run together via a single command using `docker compose`, or separately after installing their respective requirements.

## Environment setup

Several secrets, credentials, certificates, and API endpoints need to be specified in order for both the backend and frontend to function correctly. These are done via `.env` files. Secrets and certificates will have to be requested from the GUTS project data managers.

::: info
TODO: add contact point for requesting secrets etc.
:::

### The backend

Create an environment file at the location `guts-explorer/backend/.env` with the following content (commented lines provide descriptions and don't have to form part of the file; empty variable values should be completed):

```
# FLASK_ENV: current app environment, development or production
# FRONTEND_URL: Base URL that the VueJS app is served at, different for development and production
# FLASK_SECRET_KEY: app secret key for signing session cookies
# OIDC_CLIENT_ID: id of app registered with SRAM OIDC service
# OIDC_CLIENT_SECRET: secret of app registered with SRAM OIDC service
# OIDC_AUTHORIZATION_ENDPOINT: SRAM OIDC authorization endpoint
# OIDC_TOKEN_ENDPOINT: SRAM OIDC token endpoint
# OIDC_USERINFO_ENDPOINT: SRAM OIDC user info endpoint
# OIDC_REVOKE_ENDPOINT: SRAM OIDC revoke endpoint
# OIDC_REDIRECT_URI: SRAM OIDC authorization endpoint
# NEPTUNE_BASE_URL: Base URL for Neptune endpoints
# NEPTUNE_USERNAME: Basic authentication username for neptune
# NEPTUNE_PASSWORD: Basic authentication password for neptune
# NEPTUNE_CERT_PATH: Path to verification certificate for neptune, relative to backend repo root
# SRAM_USER_ENDPOINT: The Neptune endpoint to request a new user registration or information

FLASK_ENV=development
FRONTEND_URL=http://localhost:3000
FLASK_SECRET_KEY=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
OIDC_AUTHORIZATION_ENDPOINT=https://proxy.sram.surf.nl/saml2sp/OIDC/authorization
OIDC_TOKEN_ENDPOINT=https://proxy.sram.surf.nl/OIDC/token
OIDC_USERINFO_ENDPOINT=https://proxy.sram.surf.nl/OIDC/userinfo
OIDC_REVOKE_ENDPOINT=https://proxy.sram.surf.nl/OIDC/revoke
OIDC_REDIRECT_URI=http://localhost:3000/guts-explorer/user
NEPTUNE_BASE_URL=https://neptune1.irodspoc-surf.src.surf-hosted.nl:8443
NEPTUNE_USERNAME=
NEPTUNE_PASSWORD=
NEPTUNE_CERT_PATH=
SRAM_USER_ENDPOINT=projects/GUTS-Metadata/sram
```

The `NEPTUNE_CERT_PATH` path needs to point to the certificate for communication with the Neptune server, that should also be requested from the GUTS project data manager.


### The frontend

Create an environment file at the location `guts-explorer/frontend/.env` with the following content:

```
VITE_BACKEND_API_URL=http://localhost:5000
```


## Run with Docker

Ensure you have:

- recent versions of `docker` and `docker compose` installed
- created the respective `.env` files for the backend and frontend
- added a certificate file for the backend

Then run the following from the `guts-explorer` directory:

```
docker compose up
```

This should build the Docker images locally and run them as containers, after which the frontend service should be available in the browser at http://localhost:3000.

Note that the `docker-compose.yml` file contains three services: `frontend`, `backend`, and `metadata_updater`, with the latter being a prerequisite for the former two:

```yaml
  metadata_updater:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend:/app
      - data:/app/data
    command: ["python", "src/update_metadata.py"]
```

This service runs on backend container startup and uses the script at `backend/src/update_metadata.py` to retrieve updated metadata that supports the functioning of the application.

## Run *without* Docker

Both the backend and frontend can also be run separately in their own native/virtual environments.

### The backend

In a new shell, create a virtual Python environment (e.g. with `venv`):

```
python -m venv ~/guts_py
source ~/guts_py/bin/activate
```

and install the requirements with `pip`:

```
cd backend
pip install -r requirements.txt
```

Ensure that you have set up the backend environment as specified above, and then run the following from the `backend` directory:

```
python -m flask --app src/app run --host=0.0.0.0 --port=5000
```

This will start the backend Flask server at http://localhost:5000, which is required by the frontend.

The `metadata_updater` script can also be run from the same virtual environment as follows (from the `backend` directory):

```
python src/update_metadata.py
```

### The frontend

In a new shell, create and activate a virtual `node` environment, e.g. with `miniconda`:

```
conda create -yn guts_node nodejs
conda activate guts_node
```

and install the requirements with `npm`:

```
cd frontend
npm install
```

Ensure that you have set up the frontend environment as specified above, and then run the following from the `frontend` directory:

```
npm run dev
```

This will launch the VueJS frontend application, which will be accessible at: http://localhost:3000.

Note that the frontend by itself is not enough to test the GUTS Explorer fully. The backend server needs to run as well.

