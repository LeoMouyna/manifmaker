import {SecurityServiceServer} from "../../server/service/SecurityServiceServer"

/** @class ServerTaskService */
export class ServerTaskService {

    /**
     * @summary  Tasks.before.insert
     * @description
     * - Collection Hooks :  Tasks.before.insert
     * - Needed role : TASKWRITE
     */
    static allowInsert(userId, doc) {
        SecurityServiceServer.grantAccessToItem(userId, RolesEnum.TASKWRITE, doc, 'task');
    }

    /**
     * @summary  Tasks.before.update
     * @description
     * - Collection Hooks :  Tasks.before.update
     * - Needed role : TASKWRITE
     *   - ACCESSPASSVALIDATION
     *   - ASSIGNMENTVALIDATION
     *   - EQUIPMENTVALIDATION
     *   - ASSIGNMENTTASKUSER
     *
     *   Also check task validation state to authorize
     */
    static allowUpdate(userId, doc, fieldNames, modifier, options) {
        SecurityServiceServer.grantAccessToItem(userId, RolesEnum.TASKWRITE, doc, 'task');

        //TODO every taskWrite below are useless no ?
        if (_.contains(fieldNames, "accessPassValidation"))
            if (modifier.$set.accessPassValidation.currentState === ValidationState.TOBEVALIDATED)
                SecurityServiceServer.grantAccessToItem(userId, RolesEnum.TASKWRITE, doc, 'task');
            else
                SecurityServiceServer.grantAccessToItem(userId, RolesEnum.ACCESSPASSVALIDATION, doc, 'task');

        if (_.contains(fieldNames, "assignmentValidation")) {
            if (modifier.$set.assignmentValidation.currentState === ValidationState.TOBEVALIDATED)
                SecurityServiceServer.grantAccessToItem(userId, RolesEnum.TASKWRITE, doc, 'task');
            else
                SecurityServiceServer.grantAccessToItem(userId, RolesEnum.ASSIGNMENTVALIDATION, doc, 'task');
        }

        if (_.contains(fieldNames, "equipmentValidation"))
            if (( modifier.$set.equipmentValidation && modifier.$set.equipmentValidation.currentState === ValidationState.TOBEVALIDATED ||
                modifier.$set["equipmentValidation.currentState"] === ValidationState.TOBEVALIDATED))
                SecurityServiceServer.grantAccessToItem(userId, RolesEnum.TASKWRITE, doc, 'task');
            else
                SecurityServiceServer.grantAccessToItem(userId, RolesEnum.EQUIPMENTVALIDATION, doc, 'task');

        if (_.contains(fieldNames, "timeSlots")) {
            if (!SecurityServiceServer.testAccessToItem(userId, RolesEnum.ASSIGNMENTVALIDATION, doc, 'task'))
                if (doc.timeSlotValidation.currentState !== ValidationState.OPEN && doc.timeSlotValidation.currentState !== ValidationState.REFUSED) {
                    throw new Meteor.Error("403", "Can't update task time slot data if validation state is not open or refused");
                }
        }

        if (_.intersection(fieldNames, [
                "equipments",
                "powerSupplyId",
                "equipmentStorageId"
            ]).length !== 0) {
            if (!SecurityServiceServer.testAccessToItem(userId, RolesEnum.EQUIPMENTVALIDATION, doc, 'task'))
                if (doc.equipmentValidation.currentState !== ValidationState.OPEN && doc.equipmentValidation.currentState !== ValidationState.REFUSED) {
                    throw new Meteor.Error("403", "Can't update task equipment data if validation state is not open or refused");
                }
        }

        if (_.contains(fieldNames, "assignments")) {
            if (modifier.$push)
                if (modifier.$push.assignments)
                    SecurityServiceServer.grantAccessToItem(userId, RolesEnum.ASSIGNMENTTASKUSER, doc, 'user');
            if (modifier.$set)//TODO a virer
                if (modifier.$set.assignments)
                    SecurityServiceServer.grantAccessToItem(userId, RolesEnum.ASSIGNMENTTASKUSER, doc, 'user');
            if (modifier.$pull)
                if (modifier.$pull.assignments)
                    SecurityServiceServer.grantAccessToItem(userId, RolesEnum.ASSIGNMENTTASKUSER, doc, 'user');
        }
    }

    /**
     * @summary  Tasks.before.delete
     * @description
     * - Collection Hooks :  Tasks.before.delete
     * - Needed role : TASKDELETE
     */
    static allowDelete(userId, doc) {
        SecurityServiceServer.grantAccessToItem(userId, RolesEnum.TASKDELETE, doc, 'task');
    }
}