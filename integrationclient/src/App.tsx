import React, {Component} from 'react';
import RecordPanel from "./components/recordpanel/RecordPanel";
import {MainButton} from "./components/mainbutton/MainButton";

export default class App extends Component<{}, ComponentState> {

    state = {
        showRecordPanel: false
    };

    openRecordPanel = (): void => {
        this.setState({
            showRecordPanel: true
        });
    };

    closeRecordPanel = (): void => {
        this.setState({
            showRecordPanel: false
        });
    };

    render(): React.ReactNode {
        return (
            <>
                <RecordPanel onClosePanel={this.closeRecordPanel} showRecordPanel={this.state.showRecordPanel}/>
                <MainButton onClick={this.openRecordPanel} visible={!this.state.showRecordPanel}/>
            </>
        );
    }
}

type ComponentState = {
    showRecordPanel: boolean
};
