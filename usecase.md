# Use cases

## Client use case
1. Client is setup as a service
2. Client timer reaches limit
3. Client runs checks
4. Client attempts to send requests to InternetScoringServer
5. Client is marked by server as failed or sucess

## Sending requests use case
1. Send request is called
2. Sends get request to server
3. Sends post request to server //CANT DO THIS, BC THEY CAN JUST WHITELIST IT. MUST BE IN CHECK.

## Checks use case
1. Checks are ran
2. Attempts to get 3 pages
3. Returns result if minimum amount of pages are met

## InternetScoringServer use case
1. Gets client request
2. records client request in database with last time of check

## Scoring engine use case
1. Scoring engine needs to check clients
2. Scoring engine contacts InternetScoringServer
    2.1. Scoring engine fails
    2.2. NEED MORE INFO
3. Scoring engine gives scores

# Requirements
* Scoring engine must handle giving scores and checking some data
* Checks system for client
* Add thing for if scoring engine can't get score
* Make sure Client isn't stopped by teams