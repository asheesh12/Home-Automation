# Home-Automation

With Home-Automation we can register devices, get live update on devices and also communicate to devices using RESTful APIs 

### Assumptions

All the smart devices communicate using MQTT Protocol

---

## Requirements

For development we require Node.js, MongoDB, Redis and any stable MQTT Broker.

MongoDB provides flexibility in terms of data manupilation and scales well.

Redis is an in-memory datastructure store which can be used as database, cache and message broker.
Redis Pub/Sub is lightweigth and highly scalable. Works well for real time communication as it only supports transient messages.

MQTT or the Message Queue Telemetry Transport is a lightweight protocol which is very popular in the IoT industry.

---

## Setting Up Project

### Installing Redis
    $ sudo apt-get install redis-server

### Setting up Node environment

    $ git clone https://github.com/asheesh12/Home-Automation.git
    $ cd Home-Automation
    $ git checkout development
    $ npm install

## Running Project

### Starting server
    $ npm start

### Running Unit Tests
    $ npm test

---   

## Functionalities
    1. List all smart devices linked to a user
    2. Add new smart device
    3. Perform an operation on a device (using MQTT protocol)
    4. Remove an installed device
    5. Live feed of status from all the devices using MQTT protocol & Socket.io
    6. Automated testing of APIs

