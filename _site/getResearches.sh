#!/bin/bash

. .env

curl -H "Authorization: Bearer ${ZOTERO_API_KEY}" -o researches.json "https://api.zotero.org/users/${ZOTERO_USER_ID}/items?v=3&limit=100"