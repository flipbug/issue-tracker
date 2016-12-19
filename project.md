# Web3 Project

<!--
The RESTful API is written in Clojure and documented via Swagger and
Schema. The repository can be found here:
    https://gitlab.com/munen/zhaw-weng-api

The API is deployed here:
    http://zhaw-web3-issue-tracker-api.herokuapp.com/swagger-ui/index.html

The reference implementation for the frontend is done in RiotJS which
gives us a reference point and an application for demos. We shouldn't
give the code away, though. Otherwise to the students will have it
easy to be too strongly inspired by the source code. The repository
can be found here:
    https://github.com/munen/zhaw-web3-issue-tracker-project
-->

To practice what you have learned in _Web Technologien 3_, you will do
a project instead of a series of labs. You can do this exercise in a
group. Please form groups of 2-3 students on your own. This project is
weighed 20% for the final grade.

## The goal

*Create an Issue Tracker with:*

- Responsiveness in look and feel
- Persistent Issues (localStorage)
- Load from and save to a server (REST)
- Back-end to facilitate the above (Optional)

## Milestones

These are the iterations in which you will create the Issue
Tracker. They have been chosen to:

- Be aligned with the theory in the lectures
- Make the scope of the respective technologies explicit to facilitate
  a better understanding
- Represent a natural succession of steps for a project of this scope

The milestones will each be explained in more detail further down in
this document.

**1** __HTML/CSS Prototype with Web Server__\newline
   (due: Week 4)

**2** __Logic, RiotJS, localStorage__\newline
   (due: Week 9)

**3** __RESTful API__\newline
   (due: Week 11)

**3B** __Custom back end service (Optional)__\newline
   (due: Week 14)

**4** __Deployment__\newline
   (due: Week 13)

\newpage

## Mockup

This is a mockup to show the visible feature set of the Issue
Tracker. It is not meant to be a screen design, you are free to design
the application as it suits you. For example you are free to display
the priorities of the issues in a way that you think is good user
interaction - you could color them differently, you could put them in
different 'priority groups' or do something else completely.

![](mockup/issue_tracker.png)

\newpage

## Milestone 1 - HTML/CSS Prototype with Web Server

When starting with a new front end application, it is sensible to
create the Markup first and style it before you start adding any
client-side logic.

Looking at the Mockup and adding your own ideas of how the Issue
Tracker should be structured, write the Markup and style it using
a CSS style-sheet which should reside in a separate file.

In this milestone, there is no functional logic and little writing of
JavaScript required.

As you probably know know from Web1/Web2, it is quite a lot of work to
create a web-site from scratch which looks good. The default styling
of the browsers is very basic and not necessarily pleasing. Therefore,
manual styling of every component would be required which is hard to
do properly, because you would first need to figure out a style-guide
to make the components look related. Now, if you wanted your web-site
to also be responsive and be displayed properly on mobile devices with
different screen sizes, the matter would only get more complicated.

Once upon a time, only a couple years ago, this process had to be
undergone for every single web-site. Realizing this pattern and
tediousness, lots of developers have started to create Frameworks to
make this kind of development easier.

If you do not want to come up with your own responsive design, you can
implement your HTML with ![](images/bootstrap_logo.png)
[Bootstrap](http://getbootstrap.com/). When done with a little care,
it is likely that your app already looks good, is coherent and also
works on mobile devices.

As the next step of this Milestone you will implement the first feature
of the application. This is the user story for it:

    As a user, when I create a new issue and I click into the date
    field, I want to select from a date-picker instead of entering the
    date by hand.

Fortunately, there is a vast set of finished software out there for us
to use directly. You're not going to implement your own date-picker
(unless you absolutely want to), but use a
![](images/jquery_ui_logo.png) jQuery UI Widget called
[Datepicker](https://jqueryui.com/datepicker/). On the jQuery UI
web-site, you will find very good examples and documentation.

Finally, you will need to provide a web server that allows you to
serve your static mockup and all the resources needed (images,
stylesheets, javascript libraries). You can build on the one that was
discussed in lecture 3 or 4.

### Summary Milestone 1

- [ ] Implement HTML and CSS with Bootstrap or using custom code
- [ ] Use jQuery Datepicker for the issue date field
- [ ] Build a webserver in node that allows you to serve the prototype

\newpage

## Milestone 2 - Logic, RiotJS, localStorage

In this Milestone, you will add the missing logic to make the Issue
Tracker a functional product. To convey what is to be done, this
Milestone is broken down into specific _Use Cases_ that in turn are
broken down into _User Stories_. The User Stories should help you
guide along the requirements.

Implement this Milestone as a reactive Single Page Application using
![](images/riotjs_logo.png) [RiotJS](http://riotjs.com/).

### Use Case: Adding and mutating Issues within the project

* As a user, when I have selected a priority, given a date, entered an
  Issue title and have clicked "Create Issue", I want the new issue to
  appear in the issue list.
* As a user, after I have created a new Issue, I want the input fields
  to be cleared.
* As a user, when clicking the check-box of an Issue, I want the
  'completed' state of the Issue to be toggled.
* As a user, when clicking the 'trash' icon, I want the Issue to be
  deleted.

### Use Case: Persisting data to the Browser

* As a user, I want the projects data to be saved to localStorage.
* As a user, when I refresh the browser (or close and re-open the
  tab), I want all previously entered data (that is projects and
  issues) to be loaded from localStorage for instant feedback.
* As developer, when creating a new Issue, I want a new
  [UUID](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#105074)
  to be created and saved as `client_id`. It will later guarantee
  consistency between issues in the browser and back end. In the
  RESTful API (see below), you will see this client_id coming up
  again.

\newpage

## Milestone 3 - RESTful API

### Use Case: Persisting data to a Server

<!--
The database ERD is an UML Diagram generated with yuml.me.

This is the link to the ERD:
http://www.yuml.me/diagram/nofunky/class/edit/[Project|-id:long;-client_id:string;-title:string;-active:boolean]<>1-*>[Issue|-id:long;-client_id:string;-project_id:long;-done:boolean;-title:string;-due_date:date;-priority:string]

A new one can be updated by using the online editor here:
http://www.yuml.me/diagram/scruffy/class/draw
-->

Many web applications offer persistence to a back end. The Issue
Tracker will be no exception. However, you will not have to create a
back end service with a database for yourself. We will use a modern
approach and give you an API with which you can persist the
applications data in a RESTful manner.

You will not have to touch the Database yourself, however it might
help to know the schema. This is the UML diagram of the Database: ![](images/db_erd.png)

Note: Optionally, you can create your own back end service in
NodeJS. See Milestone 3B for details.

**RESTful API**

Your Single Page Application now looks feature-complete on the client
side. You are also persisting issues to the browser. However, you are
not persisting issues to a back end, yet.

For this, you can use a reference implementation of the API that you
can use described in the standardized
[Open API Initiative format](https://openapis.org/specification) here:
[http://zhaw-web3-issue-tracker-api.herokuapp.com/swagger-ui/index.html](http://zhaw-web3-issue-tracker-api.herokuapp.com/swagger-ui/index.html). On
this page, you can find the definition of the API and you can also
directly test it out in the browser. The definition page is split into
the "Issues API", the "Project API" and an API to "Practice HTTP based
services".  The latter is a good starting point to get a feel for how
HTTP based APIs work if you want to practice a little bit before
diving into using the Issues and Projects API to refresh your
knowledge of Web2.

\newpage

### Swagger API Screenshot

![](images/swagger_api.png)

\newpage

### Screenshot: adding two numbers

![](images/api_test_plus.png)

\newpage

**Project User Stories**

* As a user, when entering a Project title, I want a new Project
  to be created through the RESTful API.
* As a developer, after having created a Project through the RESTful
  API, I want to save the `id` in localStorage to the existing entry
  with the UUID so that in the future I can reference the correct
  Project.

**Issues User Stories**

* As a user, when creating an Issue, I want a new Issue to be
  created through the RESTful API in the scope of the current Project.
* As a developer, after having created an Issue through the RESTful
  API, I want to save the `id` in localStorage to the existing entry
  with the UUID so that in the future I can reference the correct
  Issue.
* As a user, when editing or deleting an existing Issue, I want this
  mutation to be reflected through the RESTful API in the scope of the
  current Project.
* As a user, when clicking the check-box of an Issue, I want the
  'completed' state of the Issue to be toggled through the RESTful
  API.
* As a user, when clicking the 'trash' icon, I want the Issue to be
  deleted through the RESTful API.
* As a user, when reloading the page, I want the Project `id` to be
  loaded from localStorage, so that a RESTful request can be made to
  load the Issues from the back end.

\newpage

## Milestone 3B (Optional): Write your own back end service

This Milestone is optional!

Up until now, you have used the reference implementation of the back
end service to persist your data. To conclude building a complete
modern SPA, you can now build your own custom NodeJS service with a
SQLite or PostgreSQL database. If you want to deploy your service to
Heroku, you will have to go for PostgreSQL.

**Technical Task**

Your task is:

1. To write your own RESTful API in NodeJS to include the same Issues
   and Projects API as the reference implementation above. Add this
   functionality to the NodeJS application that you already build in
   Milestone 1.
1. Make your SPA persist to this API.

\newpage

## Milestone 4: Deployment

Your front end application is now feature-complete. It is time to put
it on the Web, so that everyone can start using it!

### Use-Case: Deployment

The goal is to deploy the current application on Heroku and have
access to it on the Web.

**Tasks**

1. Read the [Getting Started](https://devcenter.heroku.com/start)
   documentation of Heroku.
1. Use the NodeJS server from Milestone 1 to to serve your front
   end application.
1. Follow the Heroku guide and install the application to Heroku.

Note: Check out how port binding is done in the example
application. During your local development, you will usually access
the web application through a manually configured port. In most
productive web applications that would be port 80. Heroku uses a
special configuration which does this for you.

 **Expected result**

 * You have integrated your SPA into a NodeJS web server which you
   have deployed to Heroku.
 * Everyone can use your application by accessing it via a URL.

\newpage

## How to hand in the project

For every reached Milestone, you will hand in your current version of
the project. To hand in the project, please upload it to a sFTP server
with the following credentials:

 * Server: dublin.zhaw.ch
 * Port: 22
 * User: your_zhaw_user_name
 * Password: your_zhaw_password

You can then test your upload in the browser: [http://dublin.zhaw.ch/~your_zhaw_user_name/](http://dublin.zhaw.ch/~your_zhaw_user_name/)

For the respective milestone, please create a directory with the
milestones as structure as such: `project_milestone_1` and
`project_milestone_2`. Change into the correct directory and upload
your submission.

For the milestones 3B and 4, create a ZIP file of the code and submit
it in the same way. Please make this a standard PKZIP compatible
file[^1] and don't use any other software that sounds similar like
7-zip.  Also create a `README.md` file that includes the URL to your
application on Heroku.

[^1]: On OS X, use the 'archive' feature in finder. On Linux, use the command line utility 'zip'. On Windows, use 'WinZip'.

\newpage

## Grading

- You will hand in the respective milestones as described above.
- Your code will be discussed in one of the following labs between the
  lecturer and you.
- If a milestone hasn't been handed in on time, but the functionality
  is implemented in a later milestone, you will receive 25% of the
  points of said milestone.
- You can implement an 'extra feature' to gain additional points. An
  'extra feature' is a feature that makes the application behave more
  reasonably than is explicitly required the User Stories. At the
  minimum this could be input validation. It could also be something
  sensible like a better synchronization scheme between localStorage
  and REST. If you build an extra feature, please make sure to add a
  description in your `README.md` file. Also make sure to point it out
  when showing your project to the lecturer during the lab hours.

You can get the following amount of points per Milestone and
requirement. These points will account for 20% of your grade for Web3,
there is no separate grade for the project.

| Total | M1 | M2 | M3 | M3B | M4 | Extra Feature |
|-------+----+----+----+-----+----+---------------|
|    45 |  6 | 14 |  8 |   7 |  5 |             5 |

<!-- #+TBLFM: $1=vsum($2..$>) -->
