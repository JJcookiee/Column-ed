Roles:
jacob - product owner*/backend developer
xen - backend dev
jake - frontend dev
andrew - frontend dev
luoie - backend dev
hani - frontend dev
scrum master role changes each week

*not really

url: https://column-ed.wuaze.com/

Software prerequistits:
- Programs
    VS code (or another IDE that allows git repository cloning)
    Xampp
    Git
- Database
    MySQL - used through Xampp for localhost
- Web server
    Apache - used through Xampp for localhost
- Languages
    PHP 8.5.0
    MySQL 10.4.32-MariaDB
    HTML5
    CSS3
    JS (Chrome uses V8 engine)

Repository cloning:
    - Github link: https://github.com/JJcookiee/Column-ed
    - Send Jacob your github details to be added as a contributor.
    - Cloning a repository on VS code is as simple as opening source     control, clicking clone repository and entering the url above
    - The app is currently running out of the 'xamppCompatability' branch instead of main, please swap to this branch to complete work or self host the website

No licenses have been applied

Build:
    Code is ran client-side by chrome or your browser while server side code is ran either by Xampp is on localhost or infinityfree(our web host)

API breakdown:
1) The API key can be found in any one of the API javascript files and is in the variable "apiKey"
2) This website uses The Movie Database (TMDB) so all documentation can be found at: https://developer.themoviedb.org/reference/getting-started, this will contain all the details that can
be fecthed from TMDB to be implemented on the website and the code for it
3) On the documentation site use "V3" (in the top left of the page), it should default to this when you open the page
4) When using the TMDB documentation ensure you have selected the javascript language as that is what this website uses for API's
5) If you encounter any errors please refer to: https://developer.themoviedb.org/docs/errors



instructions for local host of mysql db:
1) install xampp(you should already have this)
2) move project folder into xampp folder on local machine. The files path will look something similar to "C:\xampp\htdocs\Column-ed"
3) re-open project from new folder. make sure repository is connected
4) open xampp control panel
5) start mysql and apache
6) click mysql 'admin' button. this should open phpmyadmin
7) create new database and name it after the project
8) import schema2.sql and seed.sql files into phpmyadmin. or just copy the code into the console
9) import migration files aswell, in order
10) create file config.php with host, username, password, name variables. make sure config.php is in the gitignore. an exmaple for this file is in the shared docs
11) when connecting in php use sample code in 'host.php', or just require 'host.php' when accessing db
12) open app by typing localhost/Column-ed/ in your browser

local host notes:
- When files are uploaded to the free host website the config.php file will be changed, this will be done by jacob and will have no affect on your work

web host notes:
-my user (for the web host) doesnt have permission to add triggers, i also can't grant myself that permission in the console, therefore migration 2 and 3 are useless. it has been changed so that pfp are now set as a default and display names are part of the sign up processes

