import React, {Component} from "react";
import {AudioFilled, CloseCircleOutlined} from "@ant-design/icons/lib";
import {Button} from "antd";
import "./RecordButton.css"

type ComponentProps = {
    visible: boolean;
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
};

export default class RecordButton extends Component<ComponentProps> {

    render(): React.ReactNode {
        const {visible, isRecording, startRecording, stopRecording} = this.props;

        return (visible
            ? <Button type="primary" block
                      className={`startRecordButton ${isRecording ? "recording" : null}`}
                      size="large"
                      danger={isRecording}
                      icon={isRecording ? <CloseCircleOutlined/> : <AudioFilled/>}
                      onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Recording" : "Record"}
            </Button>
            : null);
    }
}