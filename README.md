# react-redux-template
Base template for enterprise react-redux projects with feature based layout

# Prepare
    npm install -g nodemon
    npm install

# Starting Dev Server


    npm start 

# Starting Production Server

    npm run build
    node server.js

or 
    
    npm start:prod

# Styling
Replace myapp prefix with a suitable prefix for your app to ensure proper namespace
for css styles.

# SSL Key
If you want to generate your own SSL Key, do the following 
steps in the sslcert directory:
    
    openssl genrsa 1024 > private.key
    openssl req -new -key private.key -out cert.csr
    openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

