Roles:
jacob - product owner/backend developer
xen - backend dev
jake - frontend dev
andrew - frontend dev
luoie - backend dev
hani - frontend dev
scrum master role changes each week

api instructions
1) The API key can be found in any one of the API javascript files and is in the variable "apiKey"
2) This website uses The Movie Database (TMDB) so all documentation can be found at: https://developer.themoviedb.org/reference/getting-started, this will contain all the details that can
be fecthed from TMDB to be implemented on the website and the code for it
3) On the documentation site use "V3" (in the top left of the page), it should default to this when you open the page
4) When using the TMDB documentation ensure you have selected the javascript language as that is what this website uses for API's
5) If you encounter any errors please refer to: https://developer.themoviedb.org/docs/errors

sql instructions for local use
1) install xampp(you should already have this)
2) move project folder into xampp folder on local machine. The files path will look something similar to "C:\xampp\htdocs\Column-ed"
3) re-open project from new folder. make sure repository is connected
4) open xampp control panel
5) start mysql and apache
6) click mysql 'admin' button. this should open phpmyadmin
7) create new database and name it after the project
8) import schema.sql and seed.sql files into phpmyadmin. or just copy the code into the console
9) import migration files aswell, in order
10) create file config.php with host, username, password, name variables. make sure config.php is in the gitignore
11) when connecting in php use sample code in 'host.php'
sql local host notes:
- xampp doesn't seem to use the css or external files(like the pfp png's) but you can still test the php. Use the live server extension to see css changes
- When files are uploaded to the free host website the config.php file will be changed, this will be done by jacob and will have no affect on your work
website sql notes
-my user doesnt have permission to add triggers, i also can't grant myself that permission in the console, therefore migration 2 and 3 are useless. yippie