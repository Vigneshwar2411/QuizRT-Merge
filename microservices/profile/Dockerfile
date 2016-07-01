#Pull the latest node image
FROM quizrtsocial/base-image

 # Create app directory

RUN mkdir -p /usr/src/profile
WORKDIR /usr/src/all-topics

# Copy and install dependencies
COPY package.json /usr/src/profile
RUN npm install --production

# Bundle app source

COPY profilePlugin.js /usr/src/profile
COPY profileService.js /usr/src/profile



CMD npm start
