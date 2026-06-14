Our collections updated:
trucks
cars
suvs
user
 
user will have 7 fields

First collections
Travis, You are doing trucks read, readAll, and update
Kelsey, You are doing cars read, readAll, and update
Marcellous, You are doing cars create and delete
Brady, You are doing trucks create and delete

Render: https://cse-341-final-project-proposal-zoomzoom-iy13.onrender.com

Render-api-docs: https://cse-341-final-project-proposal-zoomzoom-iy13.onrender.com/api-docs/

Render-login: https://cse-341-final-project-proposal-zoomzoom-iy13.onrender.com/login

To run locally you must do the following:<br>
1. Have a .env file with the following properly defined MONGOOSE_URI, CALL_BACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and SESSION_SECRET
2. change your swagger.json file with the following changes<br>
"host": "localhost:8080"<br>
"schemes": "http"

To run tests you must do the following:<br>
1. Have a .env file with the following properly defined MONGOOSE_URI, CALL_BACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and SESSION_SECRET
2. test are for only getAll and getOne due to OAuth problems
