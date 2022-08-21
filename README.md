# mongo-user-faq

This project uses nodejs, express, mongodb, mongoose.

## It has following features
* Create User, User Login and change password for user features.
* Assigns 3 character unique pin for all users. 
* It user jwt auth and bcrypt to hash password.
* User cannot use last 3 recent passwords.
* Sends welcome email with nodemailer on user create.
* FAQ management apis :
  * CRUD for FAQ (question,answer,category), with soft delete.
  * Create FAQ category and get FAQ categories
## How to run this project

* Clone this repo
* Do `npm install`
* Add .env file similar to an .example.env provided
* Change **PORT** , **MongodbUrl** , **JWTSECRET** in the `.env` file.
* Run command ` npm run start `

---
## POSTMAN API COLLECTION  :
`https://www.postman.com/interstellar-shadow-168600/workspace/workspacetwo/collection/14624632-1385c211-a67e-43d6-b8f9-cc274cd78d9c?action=share&creator=14624632`


* `GET : "/api/user/",` 🔒
* `POST : "/api/user/",`
* `POST : "/api/user/login"`
* `PATCH : "/api/user/password"` 🔒

* `GET : "/api/faq/"` 🔒
* `POST : "/api/faq/"` 🔒
* `PATCH : "/api/faq/:faqId"` 🔒
* `DELETE : "/api/faq/:faqId"` 🔒
* `GET : "/api/faq/category"` 🔒
* `POST : "/api/faq/category"` 🔒

*Use node *v16*
