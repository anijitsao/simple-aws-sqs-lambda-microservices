# simple-aws-sqs-lambda-microservices

Simple [Microservices](https://aws.amazon.com/microservices/) APIs implementation using [Node JS](https://nodejs.org/en/docs/) with [AWS Lambda Functions](https://aws.amazon.com/lambda/) and [AWS Simple Queue Service](https://aws.amazon.com/sqs/) along with [AWS Simple Email Service](https://aws.amazon.com/ses/).

This example illustrates how to deploy [Microservices](https://aws.amazon.com/microservices/) using [NodeJS](https://nodejs.org/en/docs/) functions running on [AWS Lambda](https://aws.amazon.com/lambda/) using the traditional [Serverless](https://www.serverless.com/framework/docs/providers/aws/guide/intro) Framework. [Microservices](https://aws.amazon.com/microservices/) _talk_ with each other using **message queue** implemented through [AWS Simple Queue Service](https://aws.amazon.com/sqs/).

This Example works with [AWS HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop.html) events i.e. `httpApi` as well as [AWS Simple Queue Service](https://aws.amazon.com/sqs/) events i.e. `sqs`. When deployed the functions can work with various types of [AWS S3](https://aws.amazon.com/s3/) operations like `ListBuckets, CreateBucket, PutObject, GetObject`.

All _logs_ for the function is kept in [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/) i.e _persistent_.

To use the code in this example you **must** have an valid [AWS account](https://aws.amazon.com/account/) and necessary [AWS IAM](https://aws.amazon.com/iam/) roles and _programmatic access_ to an user. You should **also** have an [AWS Simple Email Service ](https://aws.amazon.com/ses/) _Identity_ for sending Emails.

## Features

1. [AWS Lambda](https://aws.amazon.com/lambda/) functions using [NodeJS](https://nodejs.org/en/docs/)
2. Function is using latest version of [AWS SDK JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html) with all **ES6+** syntaxes like Promises, `async/await`

<ol start="3">
  <li>
     Function are deployed using <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">Serverless</a> Framework.
  </li>  
  <li>
    <code>serverless.yml</code> is used for deployment configuration.
  </li>  
  <li>
    All the deployment is created in <a href="https://aws.amazon.com/s3/">AWS S3</a> to store the <code>.zip</code> of the function code and <a href="https://aws.amazon.com/cloudformation/">AWS CloudFormation</a> Stack.
  </li>

  <li> Basic <a href="https://aws.amazon.com/s3/">AWS S3</a> operations <code>ListBuckets, CreateBucket, PutObject, GetObject</code> are supported.</li>
</ol>

<br>

7. [AWS HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop.html) are using [AWS API GateWay](https://aws.amazon.com/api-gateway/)
8. **Three** types of events are supported namely `httpApi`, `schedule` and `sqs`.
9. Emails are sent when the corresponing functions are invoked through **HTTP POST** request
10. [NPM](https://www.npmjs.com/) dependencies are used for various purposes.
11. This APIs can also be consumed by any <b>Frontend Application</b>.

## Usage

First clone the repo

```bash
$ git clone https://github.com/anijitsao/simple-aws-sqs-lambda-microservices.git
```

Install all the necessary dependencies by going inside the directory

```bash
$ cd simple-aws-sqs-lambda-microservices

# To install necessary dependencies
$ npm install
```

### Deployment

In order to deploy the example, you need to run the following command:

```bash
$ serverless deploy

# To deploy a particular function
$ serverless deploy function -f greeting
```

### Invocation

After successful deployment, you can invoke the deployed **functions**.

However, to call HTTP API you can use any _supported_ REST Client like [Talend API Tester](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=en) with the `url` and _HTTP Verbs_ as shown in Terminal after using `serverless deploy`.

## API Listing

API listing is given below, -

**POST** /url-of-the-deployed-lambda/sendmessage have the following input JSON

```javascript
{
  "itemPurchased": [
    {
      "itemName":"Madhur Sugar",
      "qtyPurchased":"7"
    }
  ],
  "storeName": "Grofers"
}
```

**GET** /url-of-the-deployed-lambda/getcontents have no input JSON

**POST** /url-of-the-deployed-lambda/upload have the following input JSON

```javascript
{
  "fileName": "hello.txt",
  "fileContents": "This is hello world text",
  "userId": "7840awuw4js568wm4nsuar5h" // optional
}
```

**POST** /url-of-the-deployed-lambda/greeting have the following input JSON

```javascript
{
  "name": "John Doe",
}
```
