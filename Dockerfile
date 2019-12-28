FROM node:12

RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN wget https://chromedriver.storage.googleapis.com/79.0.3945.36/chromedriver_linux64.zip

RUN unzip chromedriver_linux64.zip

RUN mv chromedriver /usr/bin/chromedriver

RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-stable

ENV CHROME_BIN /usr/bin/google-chrome

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8085

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]
