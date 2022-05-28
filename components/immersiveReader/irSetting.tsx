import { useState } from "react";
import { Modal } from "react-bootstrap";

const IRSettings = (props) => {
    const showModal = props.showIRSetting;
    const setShowIRSetting = props.setShowIRSetting;
    const { currFS, setCurrFS } = props;

    const handleFSChange = (e) => {
        e.preventDefault();
        setCurrFS(e.target.value);
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowIRSetting(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <label
                                htmlFor="customRange2"
                                className="form-label"
                            >
                                Font Size x{currFS}
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                min="1"
                                max="5"
                                id="customRange2"
                                onChange={handleFSChange}
                                value={currFS}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default IRSettings;
