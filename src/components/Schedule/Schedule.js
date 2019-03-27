import React, { Component } from "react";
import ScheduleContext from "../../ScheduleContext";
import ScheduleSelector from "./ScheduleSelector/ScheduleSelector";
import ScheduleList from "./ScheduleList/ScheduleList";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: ""
        };

        this.selectorHandler = this.selectorHandler.bind(this);
    }

    selectorHandler(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div className="schedule">
                <br />
                <ScheduleSelector change={this.selectorHandler} id={"groupId"} />
                <br />
                <ScheduleList groupId={this.state.groupId} /> <br />
            </div>
        );
    }
}

Schedule.contextType = ScheduleContext;

export default Schedule;