// import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Modal.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modal({ handleModal, dataImage }) {
    return (
        <div className="modal-user-manage ">
            <div className="modal__inner">
                <div className="modal__header">
                    <p>Ảnh đại diện</p>
                    <span onClick={() => handleModal()}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
                <div className="modal__body" style={{ backgroundImage: `url(${dataImage})` }}></div>
                <div className="modal__footer">
                    <button onClick={() => handleModal()}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
