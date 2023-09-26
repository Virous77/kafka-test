# Kafka Feature Test

#### I just tried to test kafka basics feature. used docker and stored data to mysql database.

## How to use this project in your local

##### --> all you need to have Docker installed in your machine.

#### --> Move to project root directory and run "DOCKER COMPOSE UP"

#### --> After run "Node ./admin.js"

#### --> After you can run "Node ./consumer.js user-1" so it will create consumer which will consume the message. here you can create multiple process with new name as we have created here with user-1.

#### --> After that just run "node ./producer.js" and add for example "example north" or "example south" and it will produce the message and consumer will consume and add in database.

## # Make sure to create "logs" name database in your mysql workbench so it will connect otherwise mysql connection will fail.
