class EditNameComponent extends BlazeComponent{
    template() {
        return "nameEdit";
    }

    constructor(){
        super();

        this.nameIsEditingReactive = new ReactiveVar(false);

    }

    initializeData() {
        if(this.data().collection === "Meteor.users")
            this.collection = Meteor.users
        else
            this.collection = window[this.data().collection];

        if(this.data().pathToUpdate)
            this.pathToUpdate = this.data().pathToUpdate;
        else
            this.pathToUpdate = "name";

        this.name = this.data().name;
    }


        events() {
        return [
            {
                "input .header-limited-to-text": this.displayDoneButton,//TODO more precise selector
                "click #done-name": this.updateName,//TODO more precise selector
                "click #edit-name": this.focusName,//TODO more precise selector,
                "keydown #edit-task-name-content": this.enterKeydown
            }
        ];
    }

    nameIsEditing() {
        return this.nameIsEditingReactive.get();
    }


    enterKeydown(e){
        if (e.which == 13 && e.shiftKey == false) {
            //Prevent insertion of a return
            this.updateName();
            e.preventDefault();
            e.stopPropagation();
            this.$("#edit-name-content").blur();
            return false;
        }
    }

    displayDoneButton() {
        this.nameIsEditingReactive.set(true);
    }

    focusName() {
        $("[data-key=name]").focus();
        this.nameIsEditingReactive.set(true);
    }

    updateName(e) {
        this.nameIsEditingReactive.set(false);

        var pathToUpdate = this.pathToUpdate;

        var name = $("[data-key=name]").html();
        //if (this.collection.simpleSchema().namedContext("update"+pathToUpdate).validateOne({pathToUpdate: name}, pathToUpdate)) {
            this.collection.update({_id: this.data()._id}, {
                $set: {
                    [pathToUpdate] : name
                }
            })
        //} else {
        //    TODO add error ?
        //}
    }

}


EditNameComponent.register("EditNameComponent");