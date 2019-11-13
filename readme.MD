# API Documentation
## Register User
body contents 
- firstname
- lastname
- email 
- password  
POST http://localhost:5000/api/user/register

## Login User
body contents
- email
- password  
POST http://localhost:5000/api/user/login

GET http://localhost:5000/api/user/logout

## Projects
#### Search for a project
GET http://localhost:5000/api/projects/search?fieldname=textToSearch

#### Get all projects
GET http://localhost:5000/api/projects

#### Get Paginated projects
GET http://localhost:5000/api/projects?page=1&limit=5

#### Get Project by Id
GET http://localhost:5000/api/projects/:id

#### Get all saved projects for a user
The users must be logged in !!.  
GET http://localhost:5000/api/user/getSavedProject

#### Post a project
body contents 
- userid
- projectid
POST http://localhost:5000/api/user/saveProject

#### Delete a saved project
body contents 
- userid
- projectid  
DELETE http://localhost:5000/api/user/deleteSaved

#### Like a Project
body contents 
- userid
- projectid  
POST http://localhost:5000/api/projects/dislikeProject

#### Dislike a Project
body contents 
- userid
- project_id  
POST http://localhost:5000/api/projects/likeProject

## Comments
#### Add a Comment
body contents 
- project_id  
- comment  
POST http://localhost:5000/api/projects/addComment

## Report
#### Report a project
body contents 
- project_id  
- report 
POST http://localhost:5000/api/projects/report
