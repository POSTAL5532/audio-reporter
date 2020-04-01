import React, {Component} from "react";
import RecordService from "../../service/RecordsService";
import MicRecorder from "mic-recorder";
import {Modal, Spin} from "antd";
import RecordButton from "./recordbutton/RecordButton";
import RecordingStatus from "./RecordingStatus";
import ControlButtons from "./controlbuttons/ControlButtons";
import {LoadingOutlined} from "@ant-design/icons/lib";

type RecordPanelProps = {
    onClosePanel: () => void;
    showRecordPanel: boolean;
};

type RecordPanelState = {
    sending: boolean;
    waitingAccess: boolean;
    isRecording: boolean;
    isPlaying: boolean;
    isBlocked: boolean;
    isError: boolean;
    success: boolean;
    blob: Blob;
    blobUrl: string;
};

const initRecordPanelState: RecordPanelState = {
    sending: false,
    waitingAccess: true,
    isRecording: false,
    isPlaying: false,
    isBlocked: false,
    isError: false,
    success: false,
    blob: null,
    blobUrl: null
};

export default class RecordPanel extends Component<RecordPanelProps, RecordPanelState> {

    recordService: RecordService = new RecordService();
    soundRecorder: MicRecorder = new MicRecorder({bitRate: 128});
    audio: HTMLAudioElement = null;

    state: RecordPanelState = {
        ...initRecordPanelState
    };

    componentDidMount(): void {
        this.prepareRecording();
    }

    componentDidUpdate(prevProps: Readonly<RecordPanelProps>): void {
        if (prevProps.showRecordPanel === this.props.showRecordPanel) {
            return
        }
        this.prepareRecording();
    }

    prepareRecording = (): void => {
        if (!this.props.showRecordPanel) {
            return;
        }
        navigator.getUserMedia(
            {audio: true, video: false},
            () => this.setState({...this.state, waitingAccess: false, isBlocked: false}),
            () => this.setState({...this.state, waitingAccess: false, isBlocked: true})
        );
    };

    startRecording = (): void => {
        if (this.state.isBlocked) {
            console.error("Microphone permission denied or microphone not connected");
        } else if (!this.state.isRecording) {
            this.pauseRecord();
            this.soundRecorder
                .start()
                .then(() => this.setState({...this.state, isRecording: true}))
                .catch((error) => {
                    console.error(error);
                    this.setState({...this.state, isError: true});
                });
        }
    };

    stopRecording = (): void => {
        if (this.state.isRecording) {
            this.soundRecorder.stop().getAudio()
                .then(([buffer, blob]) => {
                    this.setState({
                        ...this.state,
                        isRecording: false,
                        blob: blob,
                        blobUrl: URL.createObjectURL(blob)
                    });
                    this.audio = new Audio(this.state.blobUrl);
                    this.audio.onended = () => this.setState({...this.state, isPlaying: false});
                    this.audio.onpause = () => this.setState({...this.state, isPlaying: false});
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({...this.state, isError: true});
                });
        }
    };

    playRecord = (): void => {
        if (this.audio !== null) {
            this.audio.play()
                .then(() => {
                    console.log("Playing success");
                    this.setState({...this.state, isPlaying: true})
                })
                .catch(() => console.error("Playing fail"));
        }
    };

    pauseRecord = (): void => {
        if (this.audio !== null) {
            this.audio.pause();
            this.setState({...this.state, isPlaying: false})
        }
    };

    sendRecord = (): void => {
        this.setState({...this.state, sending: true});
        const formData: FormData = new FormData();
        formData.append("record", this.state.blob);
        formData.append("currentUrl", window.location.href);
        this.recordService.addNewRecord(formData)
            .then(() => this.setState({...this.state, sending: false, success: true, isError: false}))
            .catch(() => this.setState({...this.state, sending: false, success: false, isError: true}))
    };

    resetState = (): void => {
        this.setState({...initRecordPanelState});
    };

    render(): React.ReactNode {
        const {waitingAccess, isError, isBlocked, isRecording, blob, isPlaying, sending, success} = this.state;
        const controlsVisible: boolean = !waitingAccess && !isBlocked && !isError && !success;

        return (
            <Modal visible={this.props.showRecordPanel}
                   centered={true}
                   destroyOnClose={true}
                   title="Recording"
                   footer={null}
                   onCancel={this.props.onClosePanel}
                   afterClose={this.resetState}>

                <Spin size="large" tip="Sending" indicator={<LoadingOutlined style={{fontSize: 30}} spin/>}
                      spinning={sending}>
                    <RecordingStatus waitingAccess={waitingAccess}
                                     isBlocked={isBlocked}
                                     success={success}
                                     isError={isError}
                                     close={this.props.onClosePanel}/>

                    <RecordButton visible={controlsVisible}
                                  isRecording={isRecording}
                                  startRecording={this.startRecording}
                                  stopRecording={this.stopRecording}/>

                    <ControlButtons disabled={waitingAccess || isBlocked || isRecording || blob == null}
                                    visible={controlsVisible}
                                    isPlaying={isPlaying}
                                    play={this.playRecord}
                                    pause={this.pauseRecord}
                                    sendRecord={this.sendRecord}/>
                </Spin>
            </Modal>
        );
    }
}
