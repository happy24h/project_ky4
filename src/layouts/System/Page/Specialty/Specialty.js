import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '~/utils/CommonUtils';
import { toast } from 'react-toastify';
import * as axios from '~/services/adminService';

import './Specialty.scss';
// Import styles
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
function Specialty() {
    const [state, setState] = useState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
    });
    const handleOnChangeInput = (event, id) => {
        let stateCopy = { ...state };
        stateCopy[id] = event.target.value;
        setState({
            ...stateCopy,
        });
    };

    const handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setState((prev) => ({
                ...prev,
                imageBase64: base64,
            }));
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setState((prev) => ({
            ...prev,
            descriptionHTML: html,
            descriptionMarkdown: text,
        }));
    };

    const handleSaveNewSpecialty = async () => {
        let res = await axios.createNewSpecialty(state);
        if (res && res.errCode === 0) {
            toast.success('Add new clinic succeeds!');
            setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Something wrongs...');
            console.log('hoi v.anh check res:', res);
        }
    };
    return (
        <div className="manage-specialty-container">
            <div className="ms-title">THÊM KHÓA HỌC</div>

            <div className="add-new-specialty row">
                <div className="col l-6 form-group">
                    <label>Tên khóa học</label>
                    <input
                        className="form-control"
                        type="text"
                        value={state.name}
                        onChange={(event) => handleOnChangeInput(event, 'name')}
                    />
                </div>
                <div className="col l-6 form-group image-classroom">
                    <label>Ảnh khóa học</label>
                    <input className="form-control-file" type="file" onChange={(event) => handleOnchangeImage(event)} />
                </div>

                <div className="col l-12">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={state.descriptionMarkdown}
                    />
                </div>
                <div className="col l-12">
                    <button className="btn-save-specialty" onClick={() => handleSaveNewSpecialty()}>
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Specialty;
