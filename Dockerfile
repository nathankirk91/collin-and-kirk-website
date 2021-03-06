FROM node:12 as builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_TOKEN
ARG GATSBY_STRIPE_PUBLISHABLE_API

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
#dokku config:set --no-restart collinandkirkapi 

# Bundle app source
COPY . .

RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/public /usr/share/nginx/html