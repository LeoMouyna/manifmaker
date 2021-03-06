import {BaseCalendarComponent} from "../common/BaseCalendarComponent"
import {AssignmentService} from "../../../both/service/AssignmentService"
import {CalendarServiceClient} from "../../../client/service/CalendarServiceClient"

export class ReadAvailabilitiesCalendarComponent extends BaseCalendarComponent {
  /* available in data
   this.data().parentInstance

   */

  constructor() {
    super();
  }

  events() {
    return super.events().concat({});
  }

  enableAction(date, timeHours) {
    var user = this.parentComponent().parentComponent().data();
    var userTeams = user.teams;

    var startDate = this.getCalendarDateTime(date, timeHours, 0);
    var endDate = new moment(startDate).add(1, "hour");

    if (AssignmentTerms.findOne({
        teams: {
          $elemMatch: {
            $in: userTeams
          }
        },
        $and: [
          {
            start: {
              $lte: startDate.toDate()
            }
          },
          {
            end: {
              $gte: endDate.toDate()
            }
          }
        ],
        $or: [
          {
            assignmentTermPeriods: {
              $size: 0
            }
          },
          {
            assignmentTermPeriods: {
              $elemMatch: {
                $and: [
                  {
                    start: {
                      $lte: startDate.toDate()
                    }
                  },
                  {
                    end: {
                      $gte: endDate.toDate()
                    }
                  }
                ],
              }
            }
          }
        ]
      })
    )
      return true;

    return false;
  }

  timeSlot(date, timeHours, idTask) {
    var minutes = this.currentData().quarter;
    var startCalendarTimeSlot = this.getCalendarDateTime(date, timeHours, minutes);
    var user = this.data().user;
    if (!user) return [];

    var calendarSlotData;
    //we search for an availability
    calendarSlotData = CalendarServiceClient.getCalendarSlotData(user.Id, user.availabilities, startCalendarTimeSlot, false);
    if (calendarSlotData) return [calendarSlotData];
    //or an assignment;
    var userAssignments = AssignmentService.getAssignmentForUser(user);
    calendarSlotData = CalendarServiceClient.getCalendarSlotData(user.Id, userAssignments, startCalendarTimeSlot, true);
    if (calendarSlotData) return [calendarSlotData];

  }
}

ReadAvailabilitiesCalendarComponent.register("ReadAvailabilitiesCalendarComponent");