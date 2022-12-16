import { useState, useEffect } from 'react';
import * as axios from '~/services/adminService';
import moment from 'moment';
// localization giúp moment mặc định tiếng việt
// eslint-disable-next-line no-unused-vars
import localization from 'moment/locale/vi';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TeacherSchedule.scss';
import { faCalendarAlt, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
function TeacherSchedule({ teacherIdFromParent }) {
    const [availableTime, setAvailableTime] = useState({ allAvailableTime: [] });

    const [days, setDays] = useState([]);
    const [modal, setModal] = useState(false);
    const [dataTime, setDataTime] = useState();

    useEffect(() => {
        let allDays = getArrDays();
        console.log('all days 0:', allDays[0].value);
        const fetchApi = async () => {
            let res = await axios.getScheduleDoctorByDate(teacherIdFromParent, allDays[0].value);
            setAvailableTime(res.data);
        };

        setDays(allDays);
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherIdFromParent]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = capitalizeFirstLetter(labelVi);
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;
    };
    getArrDays();

    const handleOnChangeSelect = async (event) => {
        if (teacherIdFromParent && teacherIdFromParent !== -1) {
            let doctorId = teacherIdFromParent;
            let date = event.target.value;
            let res = await axios.getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                setAvailableTime(res.data);
            }
        }
    };

    const handleClickScheduleTime = (time) => {
        setModal(true);
        setDataTime(time);
        console.log('hoi v.anh time:', time);
    };

    return (
        <>
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => handleOnChangeSelect(event)}>
                        {days &&
                            days.length > 0 &&
                            days.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>Đăng ký tư vấn</span>
                    </div>
                    <div className="time-content">
                        {availableTime && availableTime.length > 0 ? (
                            <>
                                <div className="time-content-btns">
                                    {availableTime.map((item, index) => {
                                        let timeDisplay = item.timeTypeData.valueVi;

                                        return (
                                            <button
                                                key={index}
                                                className="btn-vie"
                                                onClick={() => handleClickScheduleTime(item)}
                                            >
                                                {timeDisplay}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="book-free">
                                    <span>
                                        Chọn <FontAwesomeIcon icon={faHandPointUp} /> và đặt (miễn phí)
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="no-schedule">
                                Nhân viên không có lịch hẹn trong thời gian này, vui lòng chọn thời gian.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {modal && <Modal setModal={setModal} dataTime={dataTime} />}
        </>
    );
}

export default TeacherSchedule;
