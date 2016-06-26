#Pull the latest node image
FROM quizrtsocial/base-image


# Create app directory
RUN mkdir -p /usr/src/verify-token
WORKDIR /usr/src/verify-token

# Copy and install dependencies
COPY package.json /usr/src/verify-token
RUN npm install --production

# Bundle app source
COPY verifyTokenMicroservice.js /usr/src/verify-token
COPY verifyToken.js /usr/src/verify-token


CMD npm start
