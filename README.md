# Home-Automation

With Home-Automation we can register devices, get live update on devices and also communicate to devices using RESTful APIs 

## Assumptions

All the smart devices communicate using MQTT Protocol


---
## Requirements

For development, we only need Node.js, MongoDB and MQTT Broker.


## Install

    $ git clone https://github.com/asheesh12/Home-Automation.git
    $ cd Home-Automation
    $ git checkout development
    $ npm install

### Starting Server
    $ npm start

### Running Unit Tests
    $ npm test

---   

## Functionalities:-
    1. List all smart devices linked to a user
    2. Add new smart device
    3. Perform an operation on a device (using MQTT protocol)
    4. Remove an installed device
    5. Automated testing of APIs
    6. User sign up / log in (Pending)
    7. Live feed of status from all the devices using MQTT protocol & Socket.io

##
Note* - I am not including several necessary functionalities like:-
    1. User email verification
    2. User forgot password
    3. Getting the list of all the available devices in a location (a dummy API is used instead)
    4. Configuring different locations
