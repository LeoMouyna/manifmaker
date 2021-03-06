FROM node:8.11 as builder

# important notice
# this build is quite slow as we are not using any layers
# take a look at https://github.com/jshimko/meteor-launchpad/blob/master/Dockerfile
# it could be good to have several layer
#     download/install given Meteor version
#     build

RUN curl https://install.meteor.com/ | sh

COPY . /var/app
WORKDIR /var/app

RUN npm install --production
RUN METEOR_ALLOW_SUPERUSER=true meteor build --directory /var/build --architecture os.linux.x86_64


FROM node:8.11

COPY --from=builder /var/build/bundle /var/manifmaker
WORKDIR /var/manifmaker

# bcrypt is recommended by Meteor to speed up performance.
RUN cd programs/server && npm install  && npm install --save bcrypt

EXPOSE 80

CMD PORT=80 MONGO_URL=mongodb://${MONGO_URL}:27017/manifmaker ROOT_URL=${ROOT_URL} node main.js