import React, { Component } from "react";
import ScheduleContext from "../../../ScheduleContext";

class ScheduleSelector extends Component {
    render() {
        return (
            <select id={this.props.id} onChange={this.props.change} defaultValue={0}>
                <option value={0} disabled={true}>----</option>
                {this.context.groups.map((group, i) => {
                    return (
                        <option value={group.id} key={i}>
                            {group.name}
                        </option>
                    );
                })}
            </select>
        );
    }
}

ScheduleSelector.contextType = ScheduleContext;

export default ScheduleSelector;
