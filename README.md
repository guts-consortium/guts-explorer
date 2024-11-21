# The GUTS Metadata Explorer

The GUTS Metadata Explorer is a browser application that allows researchers to explore the data collected during the longitudinal research project: [GUTS](https://www.gutsproject.com/). The application works with metadata, meaning there is no direct access to the research data, which is stored securely at the participating research institutes. The application allows users to filter the metadata, add the content that they are interested in to their basket, and check out the basket in order to request access to actual data content. The application was developed as a means to make the GUTS Project's research data FAIR (Findable, Accessible, Interoperable, Reusable) while simultaneously prioritising personal data privacy of research participants.

Visit the application at https://metadata.gutsproject.com to see it in action.

The GUTS Explorer consists of:
1. Flask-based backend server
2. Python utility scripts, and
3. a frontend web application developed with VueJS.

## Local testing and development

### Installation

First clone this repository and install its submodules in order to have the frontend and backend code available locally:

```
git clone https://github.com/guts-consortium/guts-explorer.git
cd guts-explorer
git submodule update --init --recursive
```

The frontend and backend can then be run together via a single command using `docker compose`, or separately after installing their respective requirements.

### Run with Docker

Ensure you have a recent version of `docker` and `docker compose` installed. Then run the following from the `guts-explorer` directory:

```
docker compose up
```

This should build the Docker images locally and run them as containers, after which the frontend service should be available in the browser at http://localhost:3000

### Run without Docker

***TODO***