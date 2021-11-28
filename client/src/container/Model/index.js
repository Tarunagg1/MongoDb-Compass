import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

export default function ModelPopup(props) {

    return (
        <div style={styles}>
            <h2>react-responsive-modal</h2>
            <Modal open={props.open} onClose={props.toggleModal}>
                {props.children}
            </Modal>
        </div>
    );
}
