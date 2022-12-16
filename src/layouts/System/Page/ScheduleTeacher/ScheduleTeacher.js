import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '~/store/actions/adminActions';
import Button from '~/components/Button';
import './ScheduleTeacher.scss';
import { toast } from 'react-toastify';
import * as axios from '~/services/adminService';
import * as moment from 'moment';
// import Moment from 'react-moment';

import _ from 'lodash';
function ScheduleTeacher({ allDoctors, fetAllDoctors, allScheduleTime, fetchAllScheduleTime }) {
    const [state, setState] = useState({
        // selectedDoctor: {},
        selectedDoctor: '',
        currentDate: -1,

        renderTime: [],
        listDoctor: [],
    });

    let a = 1;
    if (allDoctors !== state.listDoctor) {
        a += 1;
    }

    if (allScheduleTime !== state.renderTime) {
        a += 2;
    }
    if (state.renderTime.length === 0) {
        a = setTimeout(() => {
            return 1;
        }, 1000);
    }
    useEffect(() => {
        fetAllDoctors();
        fetchAllScheduleTime();

        let data = allScheduleTime;
        data = data.map((item) => ({ ...item, isActive: false }));
        setState((prev) => ({
            ...prev,
            listDoctor: allDoctors,
            renderTime: data,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [a]);

    // active nút button time
    const handleClickBtnTime = (time) => {
        console.log('time btn: ', time);
        if (renderTime && renderTime.length > 0) {
            renderTime = renderTime.map((item) => {
                if (item.id === time.id) {
                    return (item.isActive = !item.isActive);
                }
                return item;
            });
            setState((prev) => ({
                ...prev,
                ...renderTime,
            }));
        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSaveSchedule = async () => {
        let result = [];

        if (!currentDate) {
            toast.error('Invalid date!');
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected teacher!');
        }

        let dataTime = moment(new Date(new Date(currentDate).valueOf() - 86400000)).format('YYYY-MM-DD');
        let m = dataTime + 'T17:00:00.000Z';
        let formatDate = moment(m).unix() * 1000;

        if (renderTime && renderTime.length > 0) {
            let filterSelectedTime = renderTime.filter((item) => item.isActive === true);
            console.log('filterSelectedTime', filterSelectedTime);
            filterSelectedTime.map((item, index) => {
                let object = {};
                object.doctorId = +selectedDoctor;
                object.date = formatDate;
                object.timeType = item.keyMap;
                return result.push(object);
            });
        } else {
            toast.error('Invalid selected time!');
            return;
        }
        console.log('result:', result);

        let res = await axios.saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: +selectedDoctor,
            formatedDate: formatDate,
        });

        console.log('save schedule teacher >>> res: ', res);

        if (res && res.errCode === 0) {
            toast.success('Save info succeed!');
        } else {
            toast.error('error save schedule doctor', res);
        }
    };

    let { selectedDoctor, renderTime, listDoctor, currentDate } = state;

    // console.log('list state:', state);

    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">QUẢN LÝ KẾ HOẠCH THỜI GIAN CỦA GIÁO VIÊN</div>
            <div className="container">
                <div className="row">
                    <div className="col l-6 form-group">
                        <label>Chọn giáo viên </label>

                        <select className="form-control l-12" name="selectedDoctor" onChange={handleInputChange}>
                            <option value="">Choose...</option>
                            {listDoctor.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.lastName} {item.firstName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col l-6 form-group">
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            className="form-control"
                            value={state.currentDate}
                            onChange={handleInputChange}
                            name="currentDate"
                            dateformat="YYYY-MM-DD"
                            required
                        />
                    </div>
                    <div className="col l-12 pick-hour-container">
                        {renderTime &&
                            renderTime.length > 0 &&
                            renderTime.map((item, index) => {
                                return (
                                    <button
                                        className={
                                            item.isActive === true ? 'btn btn-schedule active' : 'btn btn-schedule'
                                        }
                                        key={index}
                                        onClick={() => handleClickBtnTime(item)}
                                    >
                                        {item.valueVi}
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

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTeacher);
