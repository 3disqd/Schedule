import React from "react";
import HOST from "./host";

const ScheduleContext = React.createContext();

export class ScheduleStore extends React.Component {
    state = {
        groups: [],
        groupsChannels: {},
        channels: {}
    };

    getGroup = () => {
        let updateState = data => {
            this.setState(() => ({ groups: data }));
        };

        HOST.get("group")
            .then(function(response) {
                updateState(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    getGroupChannels = id => {
        let updateState = data => {
            console.table(data);

            this.setState(prevState => ({
                groupsChannels: {
                    ...prevState.groupsChannels,
                    [id]: data
                }
            }));
        };

        HOST.get(`group/${id}/channel`)
            .then(function(response) {
                updateState(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    getProgramByGroup = id => {
        let updateState = data => {
            let res = {};

            for (let i = 0; i < data.length; i++) {
                res[data[i].id] = data[i].program;
            }

            for (let i = 0; i < data.length; i++) {
                delete data[i].program;
            }

            this.setState(prevState => ({
                channels: {
                    ...prevState.channels,
                    ...res
                },
                groupsChannels: {
                    ...prevState.groupsChannels,
                    [id]: data
                }
            }));
        };



        HOST.get(`group/${id}/channel?withProgram`)
            .then(function(response) {
                updateState(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    getProgramByChannel = id => {
        let updateState = data => {
            this.setState(prevState => ({
                channels: {
                    ...prevState.channels,
                    [id]: data
                }
            }));
        };

        HOST.get(`channel/${id}/program`)
            .then(function(response) {
                updateState(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getGroup();
    }

    render() {
        return (
            <ScheduleContext.Provider
                value={{
                    getGroup: this.getGroup,
                    groups: this.state.groups,
                    getGroupChannels: this.getGroupChannels,
                    groupsChannels: this.state.groupsChannels,
                    getProgramByChannel: this.getProgramByChannel,
                    channels: this.state.channels,
                    getProgramByGroup: this.getProgramByGroup
                }}
            >
                {this.props.children}
            </ScheduleContext.Provider>
        );
    }
}

export default ScheduleContext;
