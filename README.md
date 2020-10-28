# Home-Automation

Home Automation


Functionalities:-
    1. List all smart devices (along with sorting)
    2. Add new smart device
    3. Perform an operation on a device (MQTT)
    4. Remove an installed device
    5. Automated testing of APIs
    6. User sign up / log in
    7. Live feed of status from all the devices using MQTT protocol & Socket.io

Note* - I am not including several necessary functionalities like:-
    1. User email verification
    2. User forgot password
    3. Getting the list of all the available devices in a location (a dummy API is used instead)
    4. Configuring different locations




Controllers:-
    1. User
    2. Device 
    3. Authentication

Services:-
    1. User
    2. Device
    3. Authentication
    4. MQTT service
    5. Database service

Database Collections - 
    1. User
    2. Device


APIs-
    1. User Sign up
    2. User Login
    3. User password update
    4. Get user details - name, etc
    5. List Devices - With filters and sorting
    6. Add device
    7. Update device 
    8. Remove device
    9. Enable/Disable device
    10. *A dummy API to get all the available devices

User Schema
    firstName - String
    lastName - String
    emailAddress - String
    password - String
    roles - Array of Strings
    devices - Array of ObjectIds
    locationIds - Array of Strings


Device Schema
    name - String
    product - String
    serial Id - String
    company - String
    mqttTopic - String
    user - ObjectId
    locationId - String


NPM packages:-
    1. mongoose
    2. mqtt
    3. JWT