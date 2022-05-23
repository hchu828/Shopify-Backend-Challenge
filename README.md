# Shopify-Backend-Challenge

Built with:
* Flask/Python backend
* React frontend
* Python unittest testing

This repo holds both the frontend (in progress) and backend so that they are accessible at a single link.

`/server` contains the Flask backend (runs on default port: 5000)

`/client` contains the React frontend (runs on default port: 3000)

<b>Installation</b>

1. Clone project
`git clone https://github.com/hchu828/Shopify-Backend-Challenge.git`

2. Move into server
`cd server`

3. Make virtual environment for Python and install backend dependencies
* `python3 -m venv venv`
* `source venv/bin/activate`
* `pip3 install -r requirements.txt`

4. Run Flask
`flask run`

An error that occurred on my machine was that the Flask-CORS did not work because the virtual environment was not setup correctly. If this issue occurs, please enter:

* `deactivate`
* `source venv/bin/activate`
* `flask run`

5. Move into client
`cd ../client`

6. Install frontend dependencies
* `npm i`

<b>Testing with unittest </b>
<p> While in the server folder, run `python3 -m unittest` to run automated tests for backend view functions</p>



