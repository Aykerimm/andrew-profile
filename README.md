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

