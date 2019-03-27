import React, { Component } from "react";
import ScheduleContext from "../../../../ScheduleContext";
import HOST from "../../../../host";
import "./ScheduleListCard.css";
import ProgressBar from "../../../ProgressBar/ProgressBar";

class ScheduleListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            program: "current",
            progress: 0
        };

        this.intervalHandle = false;
        this.startCountDown = this.startCountDown.bind(this);
        this.getProgress = this.getProgress.bind(this);
    }
    componentDidMount() {
        this.startCountDown();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let data = this.context.channels[this.props.id];

        if (
            new Date(data.current.endTime) > Date.now() &&
            this.state.program === "next"
        ) {
            this.setState(() => ({ program: "current" }));
        }
    }
    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    startCountDown() {
        this.getProgress();
        this.intervalHandle = setInterval(this.getProgress, 30000);
    }

    getProgress() {
        let progress = "";

        let some = this.context.channels[this.props.id];

        if (some) {
            let start;
            let end = new Date(some.current.endTime);

            if (end > Date.now()) {
                start = new Date(some.current.startTime);
                if (this.state.program === "next") {
                    this.setState(() => ({ program: "current" }));
                }
            } else {
                this.context.getProgramByChannel(this.props.id);
                start = new Date(some.next.startTime);
                end = new Date(some.next.endTime);
                this.setState(() => ({ program: "next" }));
            }
            progress = (((Date.now() - start) / (end - start)) * 100).toFixed(0);
        }

        this.setState(() => ({ progress: progress }));
    }

    render() {
        let data = this.context.channels[this.props.id];

        let program = data
            ? `${new Date(data[this.state.program].startTime)
                .toLocaleTimeString()
                .slice(0, -3)} : ${data[this.state.program].name}`
            : ``;

        let next = data
            ? `Далее: ${new Date(data.next.startTime)
                .toLocaleTimeString()
                .slice(0, -3)} : ${data["next"].name}`
            : ``;

        return (
            <div className={"schedule-list-card"}>
                <div className="schedule-list-card__image-wrapper">
                    <img
                        className="schedule-list-card__image"
                        src={HOST.defaults.baseURL.slice(0, -1) + this.props.icon}
                        alt={this.props.name}
                    />
                </div>
                <div className="schedule-list-card__content-wrapper">
                    <div className="schedule-list-card__channel-name">
                        {this.props.name}
                    </div>
                    <div className="schedule-list-card__program">{program}</div>
                    <div
                        className="schedule-list-card__program"
                        style={{ fontSize: "11px" }}
                    >
                        {next}
                    </div>

                    <ProgressBar progress={this.state.progress} />
                </div>
            </div>
        );
    }
}

ScheduleListCard.contextType = ScheduleContext;

export default ScheduleListCard;
