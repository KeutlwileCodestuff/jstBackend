# Use an official node.js runtime as a parent image

FROM node:22-alpine

#Set the working directory in the container
WORKDIR /app

#Copy the package.json  and package-lock.json files to the container 
COPY package*.json

#Install the dependencies 
RUN npm install

#Copy the rest of the app code
COPY ..

#Expose the port that the app runs on 
EXPOSE 3005

#Command to run the app
CMD ["node" , "./src/server.js"]
