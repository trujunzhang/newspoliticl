sudo ln -s /etc/nginx/sites-available/politicl.dev /etc/nginx/sites-enabled/politicl.dev


It's a good practice to run our Meteor application as a regular user. 
Therefore, we will create a new system user specifically for that purpose:

adduser --disabled-login politicl


meteor build .
