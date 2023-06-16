# KulkasKita-CC API

This repository contains the code for the KulkasKita-CC API, which is built using Node.js and Express. The API provides backend functionality for the KulkasKita-CC app, allowing users to perform various operations related to managing a refrigerator.

## Getting Started

To get started with the API, follow the instructions below.

### Prerequisites

Make sure you have node.js and npm installed in your machine, <a href="https://nodejs.org/en/blog/release">*link here*</a>

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Capstone-Bangkit-KulkasKita/KulkasKita-CC.git
2. Navigate to the project directory:

    ```shell
    cd KulkasKita-CC
3. Install the dependencies:

    ```shell
    npm install

### Configuration

Before running the API, you need to configure some environment variables. Create a .env file in the root directory of the project and add your own settings for database

### Running the API Locally

To run the API locally, use the following command:
 
    npm run start
    
This will start the API on http://localhost:(your-port).

### Deployment

<h4>Cloud Architecture Using GCP:</h4>
<img src="https://github.com/Capstone-Bangkit-KulkasKita/KulkasKita-Documentation/blob/main/Cloud%20Architecture.jpg" alt="architecture" width="800" height="auto" />

This API is designed to be deployed on Google Cloud Run using Docker. The necessary Dockerfile and Cloud Build configuration files (cloudbuild.yaml) are included in the repository. To deploy the API, follow these steps:
1. Build the docker image

      ```shell
      gcloud builds submit --tag gcr.io/[PROJECT_ID]/kulkas-kita-cc-api
2. Deploy the image with Cloud Run:

    ```shell
    gcloud run deploy --image gcr.io/[PROJECT_ID]/kulkas-kita-cc-api --platform managed
### Documentation
For detailed information on how to use the API endpoints, refer to the <a href="https://documenter.getpostman.com/view/27775731/2s93sdXrf5">**API Documentation**</a> file.

### Tech
  <h4>BackEnd:</h4>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  
  <h4>Database:</h4>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />

<h4>Cloud:</h4>
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />
  
<h4>Tools:</h4>
   <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
  
