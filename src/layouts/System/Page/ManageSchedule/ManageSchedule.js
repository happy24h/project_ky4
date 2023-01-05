import { useState } from 'react';
import Button from '~/components/Button';
import './ManageSchedule.scss';
import { useTranslation } from 'react-i18next';

function ManageSchedule() {
    const [active, setActive] = useState(false);
    const { t } = useTranslation();

    const handleClickBtnTime = () => {
        setActive(!active);
    };
    const handleSaveSchedule = () => {
        alert('hello world');
    };
    let dataBtnTime = [
        { name: '8h - 9h' },
        { name: '9h - 10h' },
        { name: '10h - 11h' },
        { name: '11h - 12h' },
        { name: '13h - 14h' },
        { name: '14h - 15h' },
        { name: '15h - 16h' },
        { name: '16h - 17h' },
    ];
    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">QUẢN LÝ KẾ HOẠCH THỜI GIAN CỦA NHÂN VIÊN</div>
            <h1>{t('manageUser.title')}</h1>
            <div className="container">
                <div className="row">
                    <div className="col l-6 form-group">
                        <label>Chọn nhân viên </label>

                        <select className="form-control l-12" name="selectedDoctor">
                            <option value="">Choose...</option>

                            <option>hello</option>
                            <option>hello</option>
                            <option>hello</option>
                            <option>hello</option>
                        </select>
                    </div>
                    <div className="col l-6 form-group">
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            className="form-control"
                            name="currentDate"
                            dateformat="YYYY-MM-DD"
                            required
                        />
                    </div>
                    <div className="col l-12 pick-hour-container">
                        {dataBtnTime.map((item, index) => {
                            return (
                                <button
                                    className={active === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                    onClick={() => handleClickBtnTime()}
                                    key={index}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="col l-12 ">
                        <Button primary onClick={() => handleSaveSchedule()}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSchedule;
