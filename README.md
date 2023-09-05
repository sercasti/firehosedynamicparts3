# aws-lambda-nodejs-example

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- hello-world - Code for the application's Lambda function.
- template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions. These resources are defined in the `template.yaml` file in this project. 

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 18](https://nodejs.org/en/), including the NPM package management tool.

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```