FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY account-microservice.js /usr/src/service
<<<<<<< HEAD
COPY account-plugin.js /usr/src/service
=======
 COPY account-plugin.js /usr/src/service
>>>>>>> 4d803bdf7ebf780a2e583921ac8bc7325509c742
COPY account.schema.js /usr/src/service

CMD ["npm","start","--production"]
