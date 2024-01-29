# chatbot-for-meta-intents

## 1.Data for training intents classifier

The original survey questions are saved in: 

<strong>/chatbot-for-meta-intents/DialogFlow_training_data/data_2022-07-03.csv</strong>

The manual classified questions which can be directly used to train intents classifier in DialogFlow platform are saved in: 

<strong>/chatbot-for-meta-intents/DialogFlow_training_data/results_specific_features_merged/</strong>

We share all the data here but not all of them used in our chatbot.

## 2.Meta-intents instrument

The original questionnaire for meta-intents (EFA stage) is saved in:

<strong>/chatbot-for-meta-intents/Meta-intents-instruments/Meta Intents factors V1.pdf</strong>

The final questionnaire for meta-intents (CFA stage) is saved in:

<strong>/chatbot-for-meta-intents/Meta-intents-instruments/Meta Intents factors V2 Final Version.pdf</strong>


## 3. Smartphone data for backend

The smartphone data should be saved in:

<strong>/chatbot-for-meta-intents/dataset/final_smartphone_dataset.dat</strong>

However, we crawled these data from a famous online shopping platform and a famous IT-device assessment platform. They are commercial data sets. We used them for scientific research purposes, but we did not obtain any authorization to make them public. To make the backend running, please check our database structure and fill in some data: 

</strong>/chatbot-for-meta-intents/backend/models/productModel.js</strong>


## 4. Configuration for DialogFlow

Please follow the instruction of DialogFlow: <https://cloud.google.com/dialogflow/docs>

and save your own authenticity file in:

<strong>/backend/key.json</strong>

<strong>/backend/general-urtterance-label.json</strong>



## 5. Configuration for Backend env
Create your own .env file and save in: 
<strong>/chatbot-for-meta-intents/.env</strong>

It should include: 

NODE_ENV=production

#NODE_ENV=development

PORT=5001

MONGO_URI_DEVELOPMENT="mongodb://localhost/shop"

MONGO_URI_PRODUCTION="mongodb://localhost/shop"

JWT_SECRET="********"

PROJECT_ID="********"



## 6. Configuration for Frontend env
Create your own .env file and save in: 
<strong>/chatbot-for-meta-intents/frontend/.env.development</strong>

It should include: 
REACT_APP_root_image_path = "http://localhost:5001/staticL/"



## 7. Algorithm code
Feature entropy ranking: <strong>/chatbot-for-meta-intents/backend/controllers/algorithms/feature_entropy_rank.js</strong>

Critiquing algorithm: <strong>/chatbot-for-meta-intents/backend/controllers/algorithms/critiquing_algorithm.js</strong>

Content-based Filtering (Recommender System): <strong>/chatbot-for-meta-intents/backend/controllers/productController.js</strong>

Interaction tracking data structure: <strong>/chatbot-for-meta-intents/backend/models/interactionTrackModel.js</strong>

Interaction tracking action: <strong>/chatbot-for-meta-intents/frontend/src/actions/inteactionTrackActions.js</strong>



## 8. Running the chatbot

Input smartphone dataset (step 3)

Input DialogFlow confifuration files (step 4)

Input env confifuration files (step 5, step 6)

$ npm install

$ yarn dev
