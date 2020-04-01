import React, {Component} from "react";
import "./MainButton.css"
import {Button, Tooltip} from "antd";
import {AudioFilled} from "@ant-design/icons/lib";

type ComponentProps = {
    onClick: () => void;
    visible: boolean
};

export class MainButton extends Component<ComponentProps> {

    render(): React.ReactNode {
        return (this.props.visible
            ? <Tooltip placement="right" title="Record message">
                <Button className="mainButton"
                        type="primary"
                        shape="round"
                        size="large"
                        icon={<AudioFilled/>}
                        onClick={this.props.onClick}>Record</Button>
            </Tooltip>
            : null);
    }
}
