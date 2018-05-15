# Intro to Stripe

## Objectives
- [X] Why are we using the Stripe API/what is the goal of the drill
- [X] Walk through the de-coupled version
- [X] Go through Stripe Docs and find the elements needed

## Resources
- [Client side Stripe Docs](https://stripe.com/docs/stripe-js/elements/quickstart)
- [Server side Stripe Docs](https://stripe.com/docs/charges)
- [WebApp Kitchen sink Stripe walkthrough](https://webappkitchensink.com/#/apis/stripe-payments)
- [Stripe Drill walkthrough with Kyle](https://www.youtube.com/watch?v=5shH5yBGqFw)

## Notes
- Make sure you follow the readme steps first.
- Build out your Client side(main.js) first while following the Stripe docs(get your stripe keys)
- ```npm install dotenv``` require dotenv on server to mask secret key ```require('dotenv').load()```
- create a POST route for the endpoint /charge to handle th form data and token id that was is sent from the Client on submit.


# README instructions for de-coupled ver.

## Server

* cd into the server folder and `npm install`
* `npm run dev` to start up the express server on port 5000

## Client

* Open a new tab in your terminal CMD+T
* Run `lite-server` to start the client on port 3000

## Note

* Your client side code will make requests against the server at `http://localhost:5000/`
* You will need to install the `dotenv` npm package in the server side to hide your stripe secret
