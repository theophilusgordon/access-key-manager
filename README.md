# Access Key Manager Web App

## About The Project

A Web App that serves as a key manager and allows school IT personnel to register
or login and purchase Access Keys that can be used to activate their school account.

## Features

- School IT Personnel

  1. Can signup & log in with an email and password with account verification.
     There should be a reset password feature to recover lost passwords.
  2. Can see a list of all access keys granted: active, expired or revoked.
  3. For each access key, the personnel can see the status, date of
     procurement and expiry date.
  4. A user is not able to get a new key if there is an active key already
     assigned to him/her. Only one key can be active at a time.

- Micro-Focus Admin
  1. Is able to log in with an email and password.
  2. Is able to manually revoke a key
  3. Is able to see all keys generated on the platform and see the status, date of
     procurement and expiry date.
  4. Is able to access an endpoint, such that if the school email is provided, the
     endpoint returns status code 200 and details of the active key if any is found, else
     it returns 404. This is to enable them to integrate their school software with your
     key manager.

## Usage

- Write a detailed usage

_Deployment Link:_

<!-- <Not Yet Deployed> -->

## Technologies

- React.JS
- CSS
- Node.JS
- ExpressJS
- MongoDB

## Author

- _Name:_ Theophilus Gordon
- _GitHub:_ <https://github.com/gordontheophilus>
- _Email:_ theophilus.gordon@amalitech.com
