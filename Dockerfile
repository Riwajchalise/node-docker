FROM node:14
WORKDIR /app
COPY package.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --production; \
        fi

COPY . ./
ENV PORT 4000
EXPOSE $PORT
CMD ["node", "index.js"]