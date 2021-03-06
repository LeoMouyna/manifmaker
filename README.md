# PROJECT IS DEAD BECAUSE OF REASONS 
(mostly because it's annoying to work 'alone', if you are interested to take ownership of it, use it, develop on it, let me know)

# ManifMaker

##### What is for ?

ManifMaker is a single page web app aimed to plan and organize events where volunteers take a great part. 

In a few words, organizers create _tasks_ describing the job to be done, add _time slot_ defining when the _task_ has to be done and specify _people needs_ to explicit how many and what kind of volunteers are needed to perform the _task_.

Volunteers register on the app to add a few _availabilities_ and _skills_ to detail when they want to work and what they can do.  

Once the tasks and their needs are validated, organizers assign volunteers to tasks according to :

* match between  _task's time slots_ and _user's availabilities_ 
* match between _time slot's people needs_ and _user's skills_. 

## Live Demo
You can find a live demo [here](http://preprod.manifmaker.24heures.org).  

* email: superadmin@yopmail.com
* password: I4DUDZO0up8qU0c (ask Remi Pichon if not working)

## Continuous Deployment build status
branch deploy : [![Build Status](https://travis-ci.org/assomaker/manifmaker.svg?branch=deploy)](https://travis-ci.org/assomaker/manifmaker)

### Table of Contents
   * [Installation](#installation)
   * [Dev tools](#dev-tools)
      * [Quality](#quality)
         * [Auto generated Doc](#auto-generated-doc)
      * [Design and UI tools](#design-and-ui-tools)
         * [Material design icon](#material-design-icon)
         * [CSS Classes](#css-classes)
         * [Alert](#alert)
         * [Confirm and Prompt](#confirm-and-prompt)
         * [CustomSelect](#customselect)
      * [Data management](#data-management)
         * [Add a reference collection](#add-a-reference-collection)
         * [Data test](#data-test)
         * [Security](#security)
         * [Data integrity](#data-integrity)
      * [JWT](#jwt)
      * [PDF Export](#pdf-export)
      * [JSON Export](#json-export)
   * [Ops tools](#ops-tools)
      * [Environment variable](#environment-variable)
      * [Setup environment (production and preproduction available)](#setup-environment-production-and-preproduction-available)
      * [Build specific version](#build-specific-version)
      * [Update deployed version](#update-deployed-version)
      * [Backup data](#backup-data)
      * [Continuous Deployment](#continuous-deployment)
   * [Project Management](#project-management)


This TOC has been generated using 
````
docker run --rm  -v $(pwd)/:/root/ meedan/base gh-md-toc /root/README.md
````

<a id="installation" name="installation"></a>
# Installation

The project relies on [Meteor](https://www.meteor.com/), a full stack single page app framework with real time capabilities.

* install meteor itself : https://www.meteor.com/install
* fetch this repo
```bash
git clone https://github.com/assomaker/manifmaker.git
```
* go into the app folder
```bash
cd PATH_TO_REPO/app
```
* launch the framework who will first download all the dependencies (once for all), run MongoDB and run the app itself
```bash
meteor
```
* once Meteor started, you can visit the app : localhost:3000
* you can add fresh data with : localhost:3000/inject-data

> Windows User : you need to install [Git](https://git-scm.com/) if you don't already have it

> Windows User : if Meteor is not a known command, add meteor to your path. Meteor binary can be found here C:\Users\YOU\AppData\Local\.meteor
>
>[Edit Windows path](http://www.computerhope.com/issues/ch000549.htm)


<a id="dev-tools" name="dev-tools"></a>
# Dev tools 
Dev tools that are already installed and available to be used when implementing cool features.

<a id="quality" name="quality"></a>
## Quality

<a id="auto-generated-doc" name="auto-generated-doc"></a>
### Auto generated Doc 

[JSDoc](http://usejsdoc.org/) is used to generate doc from annotations on code. The generated doc is available as Markdown in the repo [/doc/markdown](https://github.com/assomaker/manifmaker/tree/master/doc/markdown) or as HTML in the [stagging machine](http://151.80.59.178/doc) **(NOT DEPLOYED ANYMORE)**.

The HTML doc is automatically build and deployed **(DISABLED)**, see [Continuous Deployment](#cd) section. The Markdown doc has to be build and commit/push when it's relevant. 

#### HTML
[JSDoc Github](https://github.com/jsdoc3/jsdoc)

```bash
npm install jsdoc -g
npm run doc:html
```

> If you don't have npm globally installed, you can use the one provided by meteor. Add 'meteor' before npm command to do so.

Open doc/html/index.html in a browser. 


#### Markdown

[doc jsdoc-to-markdown](https://www.npmjs.com/package/jsdoc-to-markdown)

```bash
npm install jsdoc-to-markdown --save-dev
npm run doc:md
```

> If you don't have npm globally installed, you can use the one provided by meteor. Add 'meteor' before npm command to do so.


Generated in /doc/markdown


<a id="design-and-ui-tools" name="design-and-ui-tools"></a>
## Design and UI tools  


<a id="#material-design-icon" name="#material-design-icon"></a>
### Material design icon

``` html
<i class="mdi mdi-home"></i>
```

Icon definition can be found here : [https://materialdesignicons.com/](https://materialdesignicons.com/). 

<a id="css-classes" name="css-classes"></a>
### CSS Classes

Some useful classes implemented in css :

````
.clickable                  cursor is a hand over this element ;
.hide-on-small-devices      the element is only displayed on large devices
.hide-on-small-devices      the element is only displayed on large devices 
````


<a id="alert" name="alert"></a>
### Alert

User friendly alerting use [s-alert](https://github.com/juliancwirko/meteor-s-alert). You basically only need 
##### Error

    sAlert.error('Your message');

##### Warning

    sAlert.warning('Your message');

##### Info

    sAlert.info('Your message');

##### Success

    sAlert.success('Your message');
    
##### Error

Alert box will be displayed 2.5 seconds, if 'Your message' if too long to be read in 2.5 seconds you can override it with (in ms) :

    sAlert.error('Your message',{ timeout : 60000 });


<a id="confirm-and-prompt" name="confirm-and-prompt"></a>
### Confirm and Prompt

[BootBox](http://bootboxjs.com/) has to be used to display a confirmation box or a prompt box. 

```
 bootbox.confirm("Are you sure ?", function(result){
                if(result){
                    //user was sure
                }
            });
```

Do not use alert or custom dialog features as S-Alert is the preferred way. 


<a id="customselect" name="customselect"></a>
### CustomSelect
A powerfull custom selector is available. It is largely inspired by Github selector and provides following features :
* text search filter on options
* mandatory or not
* single or multiple select
* directly save in a field in database or
* call one of your callback when selection changes

You can refer to the auto-generated doc [select-component.md](https://github.com/assomaker/manifmaker/blob/master/doc/markdown/select-component.md) and the live demo (need to be logged in): [/demo-select](http://preprod.manifmaker.24heures.org/demo-select), or [localhost:3000/demo-select](localhost:3000/demo-select).

<a id="data-management" name="data-management"></a>
## Data management 

<a id="add-a-reference-collection" name="add-a-reference-collection"></a>
### Add a reference collection

#### What is a reference collection ?

A Reference collection is used when the user as a choice between a set of editable values. Typically, you will need a reference collection with form field using a Custom Select (_Teams_, _Places_ or _Group Roles_ can be dynamically edited while being available in a select). All reference collection are editable in a page (/conf-maker) linked to a role _CONFMAKER_. 

Each reference collection provides a set of features : 
* list all items from the page /conf-maker
  * create button
  * text search on one field 
* create form (with your specific fields)
* update form (with your specific fields, can be different that the create form)
* optionnaly add a reference to another collection 

The good news is that a few configuration is needed to get all those features out of the box. 

#### define a schema

Add the schema to /both/collection/schema/CollectionReference.js. It will create Schema and Mongo Collection and generate every needed routes)

* PLURAL_REFERENCE_URL : url for the list (GET)
* REFERENCE_URL: url to create (POST), update and delete
* REFERENCE_COLLECTION_NAME: Mongo Variable Collection name
* REFERENCE_MONGO_COLLECTION_NAME: Collection Name in MongoDb
* REFERENCE_LABEL: How the collection will be named in html
* TEMPLATE_ROW: the template to render one row of the list


See Schemas.references.Teams for a minimal collection reference example. 

Let's say you want a collection (eg: Equipment) to reference another reference collection (eg: EquipmentCategory) to allow a link between the two (eg : Equipement refers to a EquipmentCategory)
```
CollectionName_Id  : eg  EquipmentCategories_Id 
```
It will display the "name" field of the reference collection (eg: EquipmentCategory) in the insert/uptate form (eg:Equipment).

Basic references field with custom verification that the _id actually exists and autoform to generate the dropdown
```
# eg: EquipmentCategory contains a list of Equipment
EquipmentCategories_Id: {
        type: SimpleSchema.RegEx.Id,
        label: "Equipment Category",
        custom: function () {
            if (!EquipmentCategories.findOne(this.value))
                return "unknownId";
            return 1
        },
        autoform: {
            afFieldInput: {
                options: Schemas.helpers.allEquipmentCategoriesOptions
            }
        },
    },
```

#### some magic conf

 
Please note that you need to add the following fields to have the "update" button working (sorry...)
```
baseUrl: { 
        type: String,
        label: "Team base URL",
        defaultValue: "team"
}
```

Please note that you need to add the following fields to have the "remove" button working (sorry...)
```
 type: { 
        type: String,
        label: "Teams type",
        defaultValue: "Teams"
    },
```

#### configure routes

Add the newly created Mongo Collection to the AllCollections array in /client/routes/config/route-collection-references.js. 

#### some templates 

Add your specific template in /client/templates/references/ (just copy/paste and update the existing templates to your needs. Be careful with singular and plural to have everything correctly generated)

* insert.html : template to create a new reference document
* update.html :  template to update a reference document


#### publish and subscribe

and add your new Collection to publish/subscribe policy


You should follow the current populate/clean policy


#### tests
If everything went well :
* go to /conf-maker (with a user with _CONFMAKER_ role) : the list render and your new reference collection is here
* click on "create" or go to its REST POST route : insert form render
  * fill the form and submit it : submit works and you are redirected somewhere
  * the newly created iteam appears on your reference collection list (expand it from /conf-maker)
  * try to update an item : it should works

Keep on eye on the consoles (server and client) and fix all errors. 



#### Troubleshootings

Carefully check singular and plural and that your naming is similar to the existing (use Team as an example). 


<a id="data-test" name="data-test"></a>
### Data test

In dev mode (when app is run using _meteor run_), you can inject data by using the URL :
* /inject-data : delete everything and inject auth profiles to log in as well as some conf and data.

Details regarding authentication data can be found here :

* all available roles : \both\collection\model\enum\RolesEnum.js
* groupRole : see app/server/services/InjectDataServerService._injectGroupRoles
* user : see app/server/services/InjectDataServerService.initAccessRightData
  * admin/admin
  * hard/hard
  * user1/user1


#### Super Admin user

A super admin user (superadmin/superadmin in dev mode) is created at startup no matter what. This user has all existing roles, it can't be updated or removed and doesn't have to be used for anything else that injecting data (dev mode, stagging) or create user with roles (production, at least one admin user with _ROLE_ role to add roles to other users). 

<a id="security" name="security"></a>
### Security

Access Right Security uses [alanning:roles](https://github.com/alanning/meteor-roles). 

Thoses following verifications are done (and every new features should uses all these verifications) : 

* client side : 
  * access : Iron.Router routes  : each route should test the more restrictive role that will be needed to get the 
page's features
``` Javascript
    SecurityServiceClient.grantAccessToPage(RolesEnum.TASKREAD);
```
* server side :
  * read : for each collection, in publish method : /server/server-collection
``` Javascript
    SecurityServiceServer.grantAccessToCollection(this.userId,RolesEnum.USERREAD,"users")
```
* server side :
   * write : for each collection, in allow/deny that insert/update/delete : /server/service/ServerService.js
``` Javascript
    SecurityServiceServer.grantAccessToItem(userId, RolesEnum.USERWRITE, doc, 'user udpate');
```


### Data integrity


_Following is a long pamphlet about data, you don't normally want to read it_



Data validation is done inside the schemas (both/collection/model). Simple Schema provides common validations like date, string, int. Other 
validation can be done in custom methods with custom code to validate dates overlapping, fields updates according to validation state...

**If a single operation/action needs several atomic database update, all validation has to be done explicitly BEFORE updating the data.** 
If the validation is done one times (in the operation/action), no need to put it in the schema, just do it along with the action/operation. If not and you have to put
the validation in the schema and use pre validation from Simple Schema BEFORE updating any data. This way you ensure that the data updates will not fail. 

That is because of one thing : Meteor+MongoDB is not transactional. Indeed, if one of the database update fails because of a custom control that throws an error, the previous database updates will not be reverted and the following could occurs if you 
don't use a callback or manage the update return by yourself. 

Lets take two example : update an assignment term and perform an assignment : 

* an assignment term name has to be unique, the assignment start/end dates can not overlap with any other assignment term. When inserting/updating, the system has to assert all this.  
* a assignment has to verify several things :
  * the user is actually free during the time slot target time
  * the task time slot people need specs can be satisfied by the target user
  * the task is ready for assignment
  

Updating a assignment term uses ONE atomic database. An update on AssignmentTerms collection. The controls can be performed on the related schema without any side effects. If the 
requirements are not satisfied, the update will just fail and the error can be displayed to the user. 

Performing an assignment used THREE atomic database update (actually SIX but let's simplify the example) : 
* creating an assignment in Assignments collection
* updating user's availabilities
* updating task's time slot's people needed 
If one of the three update fails because of one the custom control in the schema, let's say the task was not ready for assignment. The two others DB updates will work (creating an
Assignment and update user's availabilities) resulting in not complete assignment : user will be assigned to the task but the task will not know that the user is assigned to her. 

(Let's cut it short : it could have been prevented by another data design where the assignment information is only store in one place (Assignments) instead of having the data copied in 
the Task and the User.)

From here, two philosophies to take into account whether you agree or not to : 
> "it's easier to ask forgiveness than it is to get permission"  which can be explained by "try to do it and if it fails, repair it"

When assigning, either you firstly check everything (user is available, task is ready, people need specs matches the user) and if it's ok, you perform the assignment or you perform the assignment and revert it if something failed. 
When choosing what to do you have to keep in mind that Meteor is real time, if you update something on the DB, it will be broadcasted to everyone subscribed. If you update something
and revert it right away, you will unefficiently use DDP, the clients will compute the data and probably display something for a short amount of time before the sytem reverts the changes.
It can lead the GUI to flickr. That is why it is probably better **to check everything BEFORE** database operations **if you need more than one database update** to perform one operation/action).


<a id="jwt" name="jwt"></a>
## JWT

Javascript Web Token can be used to sign Json payload into a string token that can be sent/shared and can only be read by the app (like to create a one time login token)

### Json Payload (not generic yet)
* target : what to do
* user : which user will be used to login to perform the target


<a id="pdf-export" name="pdf-export"></a>
## PDF Export

A simple Docker image with wkhtmltopdf installed

Cmd t tests
````
OUTPUTL_FOLDER=/Users/remi/sandbox;
PDF_FILE=output.pdf;
IN=192.168.192.4:3000/jwt/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YXJnZXQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlci9uRHd3UnlQYnVDWlo4UTZwQS9leHBvcnQiLCJ0eXBlIjoidXJsIiwiaWF0IjoxNDg5NTI4NTgzfQ.DF98Qq7jqWK_qYcPL5JU0wrY97soU2JRb22S2_b-q7M
docker run --rm -v $OUTPUTL_FOLDER:/root/out/ --env IN=$IN --env OUT=/root/out/$PDF_FILE assomaker/wkhtmltopdf 
````

### Node PDF Export

Export Node PDF _docker pull assomaker/wkhtmltopdf_ image at startup

Cmd to test (from repo root folder)
````
OUTPUTDIR=$(pwd)/exported-pdf
# build node app
docker build -t assomaker/export_pdf production/export-pdf-node
# use node app in dev mode (with code in shared volume)
docker rm -f nodeexport; docker run --env OUTPUTDIR=$OUTPUTDIR --network host -v /var/run/docker.sock:/var/run/docker.sock --name nodeexport -p 3030:3030 -d -v $(pwd)/production/export-pdf-node:/root --entrypoint="" assomaker/export_pdf tail -f /dev/null; docker exec -ti nodeexport sh
$ cd /root/app/; npm install; node app.js
# use node app in normal mode (code in image)
docker rm -f nodeexport; docker run --env OUTPUTDIR=$OUTPUTDIR -v /var/run/docker.sock:/var/run/docker.sock --name nodeexport -p 3030:3030 -d  assomaker/export_pdf; docker logs -f nodeexport
# Nginx to serve file
docker rm -fv nginx; docker run --name nginx -p 8080:80 -d -v $OUTPUTDIR:/usr/share/nginx/html/pdf nginx
````

<a id="json-export" name="json-export"></a>
## JSON Export
An endpoint is available to retrieve data as Json: `api/:resource/:action`. 

Available resources and actions can be found at [ApiResourceActionService.js#L4](https://github.com/assomaker/manifmaker/blob/master/app/both/service/ApiResourceActionService.js#L4)

### Add/Update JSON Export

* add resources and actions entries in [ApiResourceActionService.js#L4](https://github.com/assomaker/manifmaker/blob/master/app/both/service/ApiResourceActionService.js#L4)
* directly customize the model with
  * `jsonExport: true` to enable simple type export (string, numbers...)
  * `jsonExportCustom: function (value) { /*do something with value*/; return value}` to customise the data format. You can query the db to resolve _ids for example.
     * it can also return an object to override the destination 'key' using 
```
return {
    newValue: "newValue",
    newKey: "newkeyinjson"
}
```

> note that newKey can use the dot notation
    
<a id="ops-tools" name="ops-tools"></a>
# Ops tools

<a id="environment-variable" name="environment-variable"></a>
## Environment variable

For Dev/Preprod:
    
    
##### DATA_INJECT_ONCE
Whatever data will be added only once, even if ManifMaker app is restarted. 

##### DATA_INJECT_EVERYTIME
Whatever data will wiped out for each anifMaker app restart. 

##### DATA_INJECT_CLASS_ALL
Which of the defined InjectDataServerService to use to inject various data. 
    
##### INJECT_MINIMUM_ACCESS_RIGHT
Inject Roles define in Roles enum, add a superadmin group roles (not updatable) and a superadmin user (not updatable).

Superadmin user has "superadmin" password in Development and a random one in Production. Superadmin password can be found in the app log when starting. 
    


For Production:

##### SKIP_INIT_ACCESS_RIGHT
Skip injected init access right (superadmin user and roles) even if it has never been injected. Either the roles and superadmin
users are already there or you will seed your database differently (not recommended). 

##### IT_IS_NOT_PRODUCTION_IT_IS_OK_TO_DELETE_DATA
Force isDevelopment mode to allow wiping out and injected data. It is only valid at startup, 'isProduction' remains
true for the app lifecycle. Value should be 'truetrue', just because we don't want to easily allow deleting data in production. 

##### IT_IS_REALLY_NOT_PRODUCTION
Value should be 'iknowwhatiamdoing' to enable usage of IT_IS_NOT_PRODUCTION_IT_IS_OK_TO_DELETE_DATA. The usage for both env
is not being explained in the logs. 

##### MAILGUN_PASSWORD

##### MAIL_URL
If MAILGUN_PASSWORD, MAIL_URL will be set

##### JWT_PRIVATE_KEY
Key use by JWT to sign a Json payload. If JWT_PUBLIC_KEY is not set, a random secret will be generated and used to both sign and verify (way less secure)

##### JWT_PUBLIC_KEY
Key use by JWT to verify a Json payload. If JWT_PRIVATE_KEY is not set, a random secret will be generated (way less secure)

##### EXPORT_PDF_ENDPOINT
Where the Node app can be reached. the ManifMaker app is POSTing to this endpoint when PDF need to be generated. 

##### NGINX_ENDPOINT
Where the Nginx serving the PDF can be reached. Currently no authentication whatsoever. 

##### MANIFMAKER_ENDPOINT
Where the ManifMaker can be reached. It used by assomaker/wkhtmltopdf to load the HTML page that needs to be exported as PDF

##### GOOGLE_CLIENTID and GOOGLE_SECRET
See https://console.developers.google.com/apis/credentials

##### FACEBOOK_APPID and FACEBOOK_SECRET
https://developers.facebook.com/docs/apps/register/

<a id="setup-environment-production-and-preproduction-available" name="setup-environment-production-and-preproduction-available"></a>
## Setup environment (production and preproduction available)

* install Docker and Compose
 
https://docs.docker.com/engine/installation

https://docs.docker.com/compose/install/

    
* clone repo and use Compose

        git clone https://github.com/assomaker/manifmaker.git
        cd manifmaker/production
        docker-compose up -d
        docker-compose --file docker-compose-preproduction.yml up -d 
        # or for production
        docker-compose up -d

* __ManifMaker will fail to start because it can't connect to mongo. You currently need to had by hand the ManifMaker mongo user. A special Docker production_mongodb image will be used in a near future__

        chmod 777 ~/manifmaker_images
        docker cp create_manifmaker_mongo_user.js production_mongodb:/root/create_manifmaker_mongo_user.js
        docker cp create_backup_mongo_user.js production_mongodb:/root/create_backup_mongo_user.js
        docker exec production_mongodb mongo localhost:27017/admin /root/create_backup_mongo_user.js
        docker exec production_mongodb mongo localhost:27017/manifmaker /root/create_manifmaker_mongo_user.js
        docker-compose up -d manifmaker

__777 on ~/manifmaker_images seems to be required by Fs Collection to store image, it didn't even work with 666. It can be a security flaw as we are giving exec access to a volume shared in a Docker__

<a id="build-specific-version" name="build-specific-version"></a>
## Build specific version 

* update REPO/app/package.json version

````
  "version": "0.3.0",
````
* commit your changes
* create a MR to __deploy__ branch to build the app

You need to have matching version number between docker-compose-preproduction.yml and package.json to deploy the version you
just built. 

<a id="update-deployed-version" name="update-deployed-version"></a>
## Update deployed version 

__Current update policy provokes a service interruption as there is only one ManifMaker node. Following steps should get easier one day.__

Make sure the version you are updating to is available on the Docker hub.

* update REPO/production/docker-compose.yml (or docker-compose-preproduction.yml) base image of manifmaker service

         manifmaker: 
                image: 'assomaker/manifmaker:0-10-0'
* commit your changes 
* create a MR to 
   * __deploy__ branch to deploy to preproduction (will also build and push the image)
   * __production__ branch to deploy to production (will not build the image)
       
<a id="backup-data" name="backup-data"></a>
## Backup data

A Mongo level backup is run everyday at midnight, it backups all /manifmaker database. 

### Restore from a backup

See the list of backups, you can run:

       docker exec mongodb_backup ls /backup

To restore database from a certain backup, simply run:

    docker exec mongodb_backup /restore.sh /backup/2015.08.06.171901
    
It will delete everything (--drop) and restore whole /manifmaker database. 

### Force a backup by hand

    docker exec mongodb_backup /backup.sh 



<a id="continuous-deployment" name="continuous-deployment"></a>
## Continuous Deployment
[Travis CI](https://travis-ci.org/assomaker/manifmaker) is used to achieve Continuous Deployment. 

When a push occurs on branch _deploy_ : 
* ManifMaker app is built from /app/package.json:version as a Docker image and push to our [Docker hub repo](https://hub.docker.com/r/assomaker/manifmaker/).
* the app version from /production/docker-compose-preproduction.yml is shipped and deployed on the stagging machine
* the HTML doc is build and deployed (available [here](http://151.80.59.178/doc)) **DISABLED**

When a push occurs on branch _production_ : 
* the app version from /production/docker-compose.yml is shipped and deployed on the production machine **NO MORE PRODUCTION MACHINE**

## Stagging old conf to build Doc
  - echo "... Now building and delivering markdown doc to repo" 
  - npm install jsdoc-to-markdown --save-dev
  - npm run doc:md
  - git config --global push.default matching
  - git remote set-url origin git@github.com:assomaker/manifmaker.git
  - git add ../doc/markdown/*.md
  - git commit -m "update markdown doc [ci skip]"
  - git branch my-temporary-work
  - git checkout master
  - git merge my-temporary-work
  - git push origin master
  - echo "... Now building and delivering html doc to staging" 
  - npm install jsdoc -g
  - npm run doc:html
  - scp -r ../doc/html root@vps302914.ovh.net:~/
  - ssh root@vps302914.ovh.net "docker cp ~/html manifmaker-nginx:/usr/share/nginx/html/doc"
  - ssh root@vps302914.ovh.net "rm -rf ~/html"

<a id="project-management" name="project-management"></a>
# Project Management

We are using the Github issues enhanced with [Zenhub product](https://www.zenhub.com/) which I recommend to install. 

Our specs and manuals tests are written in a GDoc, ask me if you want access to it. 

