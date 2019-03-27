import React, { Component } from "react";
import ScheduleContext from "../../../ScheduleContext";
import ScheduleListCard from "./ScheduleListCard/ScheduleListCard";

class ScheduleList extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.groupId !== this.props.groupId) {
            this.context.getProgramByGroup(this.props.groupId);
        }
    }

    render() {
        let cards = [];

        let channels = this.context.groupsChannels[this.props.groupId];

        if (channels) {
            for (let i = 0; i < channels.length; i++) {
                cards.push(
                    <ScheduleListCard
                        key={i}
                        id={channels[i].id}
                        name={channels[i].name}
                        icon={channels[i].icon}
                    />
                );
            }
        }

        return <div style={{ width: "700px" }}>{cards}</div>;
    }
}

ScheduleList.contextType = ScheduleContext;

export default ScheduleList;