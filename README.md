Roles:
jacob - product owner/backend developer
xen - backend dev
jake - frontend dev
andrew - frontend dev
luoie - backend dev
hani - frontend dev
scrum master role changes each week

api instructions
(will be updated by andrew once hes worked this out)

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
- xampp doesn't seem to use the css or external files(like the pfp png's) but you can still test the php.Use the live server extension to see css changes
- When files are uploaded to the free host website the config.php files will be changed, this will be done by jacob and will have no affect on your work