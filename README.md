# Versto Workout Tracker Application

Introducing Versto App, a cutting-edge fitness tracker designed to revolutionize your workout experience. Developed by the dynamic duo of fitness enthusiasts, Alyuza Satrio Prayogo and Ireng Febrian Sanjaya, this state-of-the-art application goes beyond the ordinary, offering a comprehensive set of features to elevate your fitness journey.

Versto is not just a fitness tracker; it's your ultimate companion on the path to a healthier lifestyle. With an intuitive interface crafted using Material-UI and powered by React with TypeScript, our frontend ensures a seamless and user-friendly experience. The backend, robustly supported by Express.js and Node.js, guarantees efficient performance and data handling.

Embark on your fitness journey with Versto and experience a new paradigm in workout tracking. Whether you're sculpting your physique, aiming for peak performance, or simply prioritizing your well-being, Versto is your ally every step of the way. Join us in reshaping the future of fitness – welcome to Versto, where your journey to a healthier you begins.

<img src="Readme%20Documentation/verstored.png" width="300px">

## Table of Contents

  - [Table of Contents](#table-of-contents)

  - [Acknowledgements](#acknowledgements)

  - [Flow Chart](#flow-chart)

  - [Features](#features)

  - [Installation](#installation)

  - [API Documentation](#api-documentation)

  - [Deploymennt Link](#deployment-link)

  - [Details](#details)

  - [Contact Person](#contact-person)

## Acknowledgements

- React

- Vite

- Express.js

- Node.js

- Postman

- Mongodb

- Vercel

- Material-UI

## Flow Chart

Before we started the whole project, we do planning, strategizing and make it into a flow chart to make sure that our idea is on track. Here is the flow chart picture;

<img src="Readme%20Documentation/Workout_Tracker_-_Final_Project.drawio.png" width="1000px">

## Features

- **Workout Tracker:**

  - Record and monitor your running, swimming, and cycling activities.

  - Track distance, time, and calories burned.

- **BMI Calculator:**

  - Calculate your Body Mass Index (BMI) based on height, weight and age.

  - Get personalized recommendations based on your BMI.

- **Nutrition Tips:**

  - Access helpful nutrition tips and advice to support your fitness goals.
  
## Installation

### Frontend (React - TypeScript)

1. Clone the repository:

   ```bash
   git clone https://github.com/alyuza/Workout-Tracker
   ```

2. Navigate to the frontend directory:

   ```cd workout-tracker/frontend```

3. Install dependencies:

   ```npm install```

4. Start the development server:

   ```npm run dev```

### Backend (Express.js with Node.js)

1. Navigate to the frontend directory:

   ```cd workout-tracker/backend```

2. Install dependencies:

   ```npm install```

3. Start the development server:

   ```npm run start```

## API Documentation

### User Endpoint

| Name                        |  Type Method  | Endpoint              |
| --------------------------- | ------------- | --------------------- |
| **Register**                | `POST`        | [/api/register]       |
| **Login**                   | `POST`        | [/api/login]          |

### Workout Endpoint

| Name                        |  Type Method  | Endpoint              |
| --------------------------- | ------------- | --------------------- |
| **Read All Workout**        | `GET`         | [/api/tasks]          |    
| **Create Running**          | `POST`        | [/api/tasks/running]  |
| **Create Cycling**          | `POST`        | [/api/tasks/cycling]  |
| **Create Swimming**         | `POST`        | [/api/tasks/swimming] |
| **Update Workout**          | `PUT`         | [/api/tasks/:id]      |
| **Delete Workout**          | `DELETE`      | [/api/tasks/:id]      |

### BMI Calculator Endpoint

| Name                        |  Type Method  | Endpoint              |
| --------------------------- | ------------- | --------------------- |
| **Read All BMI**            | `GET`         | [/api/bmicalculator]  |    
| **BMI Calculator**          | `POST`        | [/api/bmicalculator]  |
| **Delete BMI History**      | `DELETE`      | [/api/bmicalculator]  |

For more Documentation for Backend, here's the link: https://documenter.getpostman.com/view/29043469/2s9Ykraf9x

## BMI Calculator
On this app, you can use BMI Calculator by input the weight, height and age box and click submit. The result will appear on the right side box container. If you wondering about the result intepretation, here is the number below for you to intepret.

| BMI Category                |  BMI Standard |
| --------------------------- | ------------- |
| **Underweight**             |  < 18.5       |    
| **Normal Weight**           |  < 24.9       |
| **Overweight**              |  < 29.9       |
| **Obese**                   |  > 29.9       |

## Deployment Link

You access Frontend and Backend with link below;
Frontend: [https://www.versto.site](https://www.versto.site)
Backend: [https://workout-tracker-server-navy.vercel.app](https://workout-tracker-server-navy.vercel.app)

## Details

Versto App is a user friendly app for all age, gender and race. We're providing a simple page for user from register, login, workout tracking (running, cycling, swimming), bmi calculator and nutrition tips. Here's below for more detail;

### Login 

The very first page of Versto App that will appear is Login Page. The purpose of this page is to authenticate user and keep their personal information safe.

<img src="Readme%20Documentation/Login%20Page.png" width="650">

### Workout Dashboard 

The next page after doing login is the dashboard page. This page is consist of running, cycling, swimming, BMI Calculator and Nutrition & Tips. All activity is shown on this page.

<img src="Readme%20Documentation/Running%20Activity.png" width="650">

### Add Workout Activity 

User is allowed to add activity, all blank box must be filled such as title, description, distance, time, and date. The purpose of this specific request is to give user a tracking of their workout and also to remind the user what are they doing, what is happening at the moment they're doing the workout. To give a picture of the workout moment. 

<img src="Readme%20Documentation/Add%20Activity.png" width="400px">

### Menu 

This menu page on Side Navigation Bar is consist of running, cycling, swimming, BMI Calculator, Nutrition and Tips and Help and Support. This will be easily to lead user to each page.

<img src="Readme%20Documentation/Menu.png" width="400">

### BMI Calculator 

BMI Calculator is a feature that Versto App develop for user to calculate the Body Measurement Index. The purpose of this app is to give awareness to user about healthy weight range or if they may underweight, overweight or obese.

<img src="Readme%20Documentation/BMI%20Calculator.png" width="650" >

### Nutrition Tips 

Versto App also provide a landing page for nutrition tips, each page below will be updated with more relevant and accurate information based on expert and research paper. We believe user should have more access to accurate information for their health, mental and body improvement.

<img src="Readme%20Documentation/Nutrition%20Tips.png" width="650">

## Contact Person
[![Linkedin Badge](https://img.shields.io/badge/-Alyuza_Satrio_Prayogo-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/alyuzasp/) [![Linkedin Badge](https://img.shields.io/badge/-Ireng_Febrian_Sanjaya-darkred?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/ireng-febrian-sanjaya-6a79211a7/)

Thank you for visiting this repository and being a part of the community. Your support is crucial to the success of this project. If you have any questions or suggestions, please don't hesitate to reach out. 
