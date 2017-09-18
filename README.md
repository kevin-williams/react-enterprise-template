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

# SSL Key
If you want to generate your own SSL Key, do the following 
steps in the sslcert directory:
    
    openssl genrsa 1024 > private.key
    openssl req -new -key private.key -out cert.csr
    openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

