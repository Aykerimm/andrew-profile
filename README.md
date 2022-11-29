# How to run website locally

1. Clone the repository: `git clone <repository_url>` or Download as a zip file
2. Unzip if downloaded as a zip file
3. Go to the directory where it was downloaded in terminal. `cd andrew-profile`
4. Go to the `_site` directory. `cd _site`.
5. In terminal install web server. `yarn global add httpserver` or `npm install -g httpserver`
6. Run the server. `httpserver -p 8888`
7. Go to the browser and open: `localhost:8888/index.html`

# How to run website in Cloudflare Pages

Refer to link below:  
https://developers.cloudflare.com/pages/framework-guides/deploy-anything/#deploying-with-cloudflare-pages

 - Production branch: `main`
 - Build command: `jekyll build`
 - Build output directory: `_site`


# How to Update researches list from Zotero

Use `retrieve.js` file.

1. Install NodeJS
2. Copy the content of `sample.env` file to `.env` file
3. Create API key on Zotero website. Copy it and paste in `.env` file after `ZOTERO_API_KEY=`
4. Copy Zotero user ID on Zotero website. It should be in profile page. Copy it and paste in `.env` file after `ZOTERO_USER_ID=`
5. Run the script by executing `node retrieve.js`
6. It will download library items to a file.

