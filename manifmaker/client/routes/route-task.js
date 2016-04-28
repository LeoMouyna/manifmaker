/**
 * @memberOf Route
 * @summary Display the task list with filter and search
 * @locus client
 * @name task.list  /tasks
 */
Router.route('/tasks', function () {
        SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.TASKREAD);
        console.info("routing", "/tasks");

        this.render('tasksList', {
            to: 'mainContent'
        });
    },
    {name: 'task.list'}
);

/**
 * @memberOf Route
 * @summary Display the create task form without time slots and validation workflow
 * @locus client
 * @name task.create  /task
 */
Router.route('/task', function () {
        this.wait(Meteor.subscribe('users'));

        SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.TASKWRITE);
        console.info("routing", "/task");

        if (this.ready()) {
            this.render('insertTaskForm', {
                to: 'mainContent'
            });
        } else {
            console.log("Route /task : waiting team data"); //TODO add a spinner
        }

    },
    {name: 'task.create'}
);

/**
 * @memberOf Route
 * @summary Display the task update form by it's MongoId
 * @locus client
 * @param taskId
 * @name task.read  /task/:_id
 */
Router.route('/task/:_id', function () {
        this.wait(Meteor.subscribe('tasks'));
        this.wait(Meteor.subscribe('teams'));
        this.wait(Meteor.subscribe('places'));
        this.wait(Meteor.subscribe('skills'));
        this.wait(Meteor.subscribe('users'));
        this.wait(Meteor.subscribe('power-supplies'));

        if (this.ready()) {

            SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.TASKWRITE);
            console.info("routing", "/task/" + this.params._id);


            /**
             * Spacebar doesn't support @index nor Template.data nor Template.parent (all linked to the same things). This means
             * that I can't access task data when creating equipments form
             */
            SelectedUpdatedOrReadedTask.set(this.params._id)


            this.render('updateTaskForm', {
                data: function () {
                    var currentTask = this.params._id;
                    return Tasks.findOne({_id: currentTask});
                }, to: 'mainContent'
            });
        } else {
            console.log("waiting for data")
        }
    },
    {name: 'task.update'}
);


/**
 * @memberOf Route
 * @summary Display the task in read mode by it's MongoId
 * @locus client
 * @param taskId
 * @name task.read  /task/:_id
 */
Router.route('/task/:_id/read', function () {
        SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.TASKREAD);
        console.info("routing", "/task/" + this.params._id);

        this.render('readTaskForm', {
            data: function () {
                var currentTask = this.params._id;
                return Tasks.findOne({_id: currentTask});
            }, to: 'mainContent'
        });
    },
    {name: 'task.read'}
);

/**
 * @memberOf Route
 * @summary Update validation state for one the task part
 * @locus client
 * @param validationType
 * @param taskId
 * @param validationState
 * @name task.validation.timeSlot  /task/validation/:validationType/:_id/:state
 */
Router.route('/task/validation/:validationType/:_id/:state', function () {
        if (this.params.state === "to-be-validated") {
            SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.TASKWRITE);
        } else {
            var validationType = this.params.validationType;
            if (validationType === "time-slot")
                SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.ASSIGNMENTVALIDATION, "time slot validation");
            if (validationType === "access-pass")
                SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.ACCESSPASSVALIDATION, "access pass validation");
            if (validationType === "equipment")
                SecurityServiceClient.grantAccessToPage(Meteor.userId(), RolesEnum.EQUIPMENTVALIDATION, "equipment validation");
        }
        console.info("routing", "/task/validation/" + this.params.validationType + "/" + this.params._id + "/" + this.params.state);

        var comment = $("#" + this.params.validationType + "-validation-new-comment").val();
        $("#" + this.params.validationType + "-validation-new-comment").val("");

        ValidationService.updateValidation(this.params._id, ValidationStateUrl[this.params.state], ValidationTypeUrl[this.params.validationType], comment);

        this.redirect("/task/" + this.params._id);

    },
    {name: 'task.validation.timeSlot'}
);










