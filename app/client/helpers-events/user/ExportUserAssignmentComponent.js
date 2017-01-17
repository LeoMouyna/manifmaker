import {TimeSlotService} from "../../../both/service/TimeSlotService"

class ExportUserAssignmentComponent extends BlazeComponent {

    constructor() {
        super();
    }

    template() {
        return "exportUserAssignmentComponent";
    }

    sortedAssignments(){
        return _.sortBy(Assignments.find({userId: this.data()._id}).fetch(), function(assigment){
            return TimeSlotService.getTimeSlot(Tasks.findOne(assigment.taskId), assigment.timeSlotId).start
        });
    }
    taskAssignments(){
        return Assignments.find({timeSlotId: this.currentData()._id});
    }

    /*
    isFirstHalf(list, index){
        return index<=Object.keys(list.fetch()).length/2;
    }
    */


    groupedTasksResponsible(){
        var tasks =  _.groupBy(Tasks.find({liveEventMasterId : this.data()._id}).fetch(), function(task){
            return task.groupId;
        });
        return _.map(tasks, function(value, key) {
            return {
                groupId: key,
                tasksGrouped: value
            };
        });
    }

    task(){
        return Tasks.findOne(this.currentData().taskId);
    }

    timeSlot(){
        return TimeSlotService.getTimeSlot(this.task(), this.currentData().timeSlotId)
    }

    displayUserInfo(userId){
        var user = Meteor.users.findOne(userId);
        var phone = (user.profile.phoneNumber)?  " (" + user.profile.phoneNumber + ")":"";
        var realname = "";
        if(user.profile.firstName!=null){
            realname += user.profile.firstName;
        }
        if(user.profile.familyName!=undefined){
            realname += (" " + user.profile.familyName);
        }
        if(realname==""){
            realname = user.username;
        }else{
            realname += (" ("+user.username+")");
        }
        return realname + " " + phone;
    }
    place(placeId){
        return Places.findOne(placeId).name;
    }
    groupName(groupId){
        return TaskGroups.findOne(groupId).name;
    }

    displayEquipment (equipmentObject){
        var quantity = equipmentObject.quantity;
        var equipmentName = Equipments.findOne(equipmentObject.equipmentId).name;
        if (quantity  = 1){
            return equipmentName;
        }else if(quantity>1){
            return String(quantity) + " " + equipmentName;
        }

    }
}

ExportUserAssignmentComponent.register('ExportUserAssignmentComponent');
