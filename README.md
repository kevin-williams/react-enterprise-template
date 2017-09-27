# react-redux-template
Base template for enterprise react-redux projects with feature based layout.
Includes setup for the following:
* React
* Redux with sagas
* React-Router v4
* SASS CSS processing
    * Global variables
    * File per component layout
* Feature based layout - directory for each feature
    * Container
    * Styles
    * Actions & Constants
    * Reducer
    * Saga
* Express Server
    * Public folder for security
    * Route controllers
    * HTTPS with default key
    * Async/Await syntax
    * Winston logging
        * Log level modification service
        * Logging setup parameters including automatic file rotation/deletion
    * Multi-threading
    * Hot reloading client code in dev mode
    * Hot reloading server code in dev mode
* Production ready webpack with compression and latest javascript syntax


# "Export" into an empty directory (note the trailing . at the end)
    git clone https://github.com/kevin-williams/react-enterprise-template.git .
    rm -rf .git

If you have an empty git repository already, you can then copy this 
directory into the new directory.

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

