# SMS Management Application API

## Installation
- Clone the repo onto your machine
- Rename `.env.example` to `.env`
- Create a postgres database and add it url in the `.env` file
- Run the database migrations with the `yarn migrate` command
- Run `yarn start` to start the application.

## Documentation

Below is the API document. You can also find it [here]() in a postman collection.

### Creating a contact
To create a contact send a payload to the endpoint below.
```angular2html
    /api/v1/contacts
```

**Payload example:**

```angular2html
    {
    	"name": "Louis Nwamadi",
    	"phoneNumber": "0789525579"
    }
```

**Response:**
```angular2html
    {
        "status": "success",
        "data": {
            "id": 1,
            "name": "Louis Nwamadi",
            "phoneNumber": "0789525579",
            "updatedAt": "2018-10-03T18:47:12.255Z",
            "createdAt": "2018-10-03T18:47:12.255Z"
        },
        "message": "Contact created successfully"
    }
```

## List all contacts
Use the endpoint below to get a list of all the contacts in the system.

```angular2html
    /api/v1/contacts
```

**Response:**

```angular2html
    {
        "status": "success",
        "data": [
            {
                "id": 1,
                "name": "Louis",
                "phoneNumber": "0789525579",
                "createdAt": "2018-10-03T09:46:55.416Z",
                "updatedAt": "2018-10-03T09:46:55.416Z"
            },
            {
                "id": 3,
                "name": "Dante",
                "phoneNumber": "0789525592",
                "createdAt": "2018-10-03T18:35:22.387Z",
                "updatedAt": "2018-10-03T18:35:22.387Z"
            },
            {
                "id": 4,
                "name": "Henry",
                "phoneNumber": "0789525591",
                "createdAt": "2018-10-03T18:47:12.255Z",
                "updatedAt": "2018-10-03T18:47:12.255Z"
            }
        ]
    }
```

### Sending/Creating a message
This is the endpoint for sending a message where `contactId` is the contact Id
```angular2html
    /api/v1/contacts/:contactId/sms
```

Below is the payload to send when creating a message where receiverId is the contact id 
of message recipient.

```angular2html
    {
    	"text": "come home tomorrow",
    	"receiverId": 1
    }
``` 

**Response:** 

```angular2html
    {
        "status": "Success",
        "data": {
            "id": 3,
            "text": "come home tomorrow",
            "receiverId": 1,
            "senderId": 2,
            "status": true,
            "updatedAt": "2018-10-04T06:32:54.349Z",
            "createdAt": "2018-10-04T06:32:54.349Z"
        },
        "message": "Message sent successfully"
    }
```

### Delete contact
Deleting a contact deletes all the messages it references in the entire
application. 

Send a `Delete` request with the `contactId` to the endpoint below.

```angular2html
    /api/v1/contacts/:contactId
```

**Response:**

```angular2html
    {
        "status": "success",
        "message": "Contact has been deleted together with all the messages it references"
    }
```
## List messages sent by a contact
Send a `GET` request to the endpoint below

```angular2html
    /api/v1/contacts/:contactId/sent/sms
```

**Response:**

```angular2html
    {
        "status": "success",
        "data": [
            {
                "id": 7,
                "text": "Yo man tomorrow",
                "status": true,
                "createdAt": "2018-10-04T12:46:45.593Z",
                "updatedAt": "2018-10-04T12:46:45.593Z",
                "senderId": 3,
                "receiverId": 1
            },
            {
                "id": 8,
                "text": "Go away",
                "status": true,
                "createdAt": "2018-10-04T12:46:54.890Z",
                "updatedAt": "2018-10-04T12:46:54.890Z",
                "senderId": 3,
                "receiverId": 1
            }
        ],
        "message": "Successfully returned messages sent by a contact with Id 3"
    }
```

## List all received messages 
Send a `GET` request to the endpoint below

```angular2html
    /api/v1/contacts/:contactId/received/sms
``` 

**Response:**

```angular2html
    {
        "status": "success",
        "data": [
            {
                "id": 5,
                "text": "come home tomorrow",
                "status": true,
                "createdAt": "2018-10-04T09:48:22.626Z",
                "updatedAt": "2018-10-04T09:48:22.626Z",
                "senderId": 4,
                "receiverId": 1
            },
            {
                "id": 6,
                "text": "Yo man tomorrow",
                "status": true,
                "createdAt": "2018-10-04T09:48:38.827Z",
                "updatedAt": "2018-10-04T09:48:38.827Z",
                "senderId": 4,
                "receiverId": 1
            }
        ],
        "message": "Successfully returned messages received by 1"
    }
```

## Delete message

Send a `DELETE` request to the endpoint below

```angular2html
    /api/v1/contacts/:contactId/sms/:messageId
```

**Response:**

```angular2html
    {
        "status": "success",
        "message": "Message deleted successfully"
    }
```