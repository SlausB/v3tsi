FROM node:18

WORKDIR /app

EXPOSE 5173

CMD [ "npm", "i", "&&", "npm", "run", "dev", "--", "--host"]
