import React, {Component} from "react";
import {Button, Col, Row} from "antd";
import {CaretRightOutlined, CloudUploadOutlined, PauseOutlined} from "@ant-design/icons/lib";
import "./ControlButtons.css";

type ComponentProps = {
    disabled: boolean;
    visible: boolean;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    sendRecord: () => void;
};

export default class ControlButtons extends Component<ComponentProps> {

    render(): React.ReactNode {
        const {disabled, visible, isPlaying, play, pause, sendRecord} = this.props;

        return (visible
            ? <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Button block size="large"
                            disabled={disabled}
                            icon={<CloudUploadOutlined/>}
                            onClick={sendRecord}>
                        Send record
                    </Button>
                </Col>
                <Col span={12}>
                    <Button block size="large"
                            className={isPlaying ? "playing" : null}
                            disabled={disabled}
                            icon={isPlaying ? <PauseOutlined/> : <CaretRightOutlined/>}
                            onClick={isPlaying ? pause : play}>
                        {isPlaying ? "Pause" : "Play"} record
                    </Button>
                </Col>
            </Row>
            : null);
    }
}