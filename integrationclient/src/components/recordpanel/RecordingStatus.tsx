import React, {Component} from "react";
import {Button, Result} from "antd";
import {FrownOutlined, LoadingOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons/lib";
import {ResultStatusType} from "antd/lib/result";

type AccessStatusProps = {
    waitingAccess: boolean;
    isBlocked: boolean;
    isError: boolean;
    success: boolean;
    close: () => void;
};

export default class RecordingStatus extends Component<AccessStatusProps> {
    render(): React.ReactNode {
        const {waitingAccess, isBlocked, success, isError, close} = this.props;
        let title: string;
        let status: ResultStatusType;
        let icon: React.ReactNode;
        let subTitle: string;
        let extraButtons: React.ReactNode[] = [];

        if (waitingAccess) {
            icon = <LoadingOutlined/>;
            status = "info";
            title = "Waiting microphone access";
            subTitle = "Confirm microphone access in browser popup";
        } else if (isBlocked) {
            icon = <MehOutlined/>;
            status = "warning";
            title = "Microphone access denied";
            subTitle = "You can give access to the microphone for the site in the browser settings";
            extraButtons.push(<Button key="closeRecording" onClick={close}>Close</Button>)
        } else if (success) {
            icon = <SmileOutlined/>;
            status = "success";
            title = "Record success send";
            subTitle = "If you left your contacts, the manager will contact you";
            extraButtons.push(<Button key="closeRecording" onClick={close}>Close</Button>)
        } else if (isError) {
            icon = <FrownOutlined/>;
            status = "error";
            title = "Something went wrong";
            subTitle = "Check your network connection and try again";
            extraButtons.push(<Button key="closeRecording" onClick={close}>Close</Button>)
        }

        return (waitingAccess || isBlocked || success || isError
            ? <Result icon={icon}
                      status={status}
                      title={title}
                      subTitle={subTitle}
                      extra={extraButtons}/>
            : null);
    }
}