---
layout: doc
---

# The Explorer backend

***Source code: https://github.com/guts-consortium/guts-explorer-backend***

The backend has two main purposes:
1. Provides the script responsible for fetching and processing metadata from the Neptune server ([API](https://neptune1.irodspoc-surf.src.surf-hosted.nl:8443/docs#)), which should be run at regular intervals
2. Exposes API functions and utilities to the frontend to support the complete operation of the GUTS explorer

It does these tasks while keeping any secrets/credentials securely stored in the backend so that none of these have to be accessed by the frontend. It also handles custom communication with the Neptune server and SRAM OIDC server and in turn exposes a uniform API to the frontend to access these functionalities.

::: info
TODO
:::

