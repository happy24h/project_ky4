import { useState, useEffect } from 'react';
import _ from 'lodash';
import * as axios from '~/services/adminService';
import { useParams } from 'react-router-dom';
import ProfileTeacher from './ProfileTeacher';
import TeacherSchedule from '../EmployeeClient/Schedule/EmployeeSchedule';
import InfoAboutTeachers from '../EmployeeClient/Info/InfoAboutEmployee';
import './DetailCourse.scss';

function DetailCourse() {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    console.log(course);

    useEffect(() => {
        const fetchApi = async () => {
            let res = await axios.getAllDetailSpecialtyById({ id: id, location: 'ALL' });
            let resProvince = await axios.getAllCodeService('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let dataCourse = res.data;
                let arrTeacherId = [];

                if (dataCourse && !_.isEmpty(dataCourse)) {
                    let arrCourse = dataCourse.doctorSpecialty;
                    if (arrCourse && arrCourse.length > 0) {
                        arrCourse.map((item) => {
                            return arrTeacherId.push(item.doctorId);
                        });
                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc',
                    });
                }
                setCourse({
                    dataDetailCourse: dataCourse,
                    arrTeacherId: arrTeacherId,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        };
        fetchApi();
    }, [id]);
    const handleOnChangeSelect = async (event) => {
        let location = event.target.value;
        console.log('id & location ------', id, location);
        let res = await axios.getAllDetailSpecialtyById({ id, location });
        if (res && res.errCode === 0) {
            let data = res.data;
            let arrTeacherId = [];
            if (data && !_.isEmpty(res.data)) {
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map((item) => {
                        return arrTeacherId.push(item.doctorId);
                    });
                }
                setCourse((prev) => ({
                    ...prev,
                    dataDetailCourse: data,
                    arrTeacherId: arrTeacherId,
                }));
            }
        }
    };
    let { dataDetailCourse, listProvince, arrTeacherId } = course;
    return (
        <div className="detail-specialty-container">
            <div className="detail-specialty-body">
                <div className="description-specialty">
                    {dataDetailCourse && !_.isEmpty(dataDetailCourse) && (
                        <div dangerouslySetInnerHTML={{ __html: dataDetailCourse.descriptionHTML }}></div>
                    )}
                </div>
                <div className="search-sp-doctor">
                    <select onChange={(event) => handleOnChangeSelect(event)}>
                        {listProvince &&
                            listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {item.valueVi}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                {arrTeacherId &&
                    arrTeacherId.length > 0 &&
                    arrTeacherId.map((item, index) => {
                        return (
                            <div className="each-doctor" key={index}>
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileTeacher
                                            teacherId={item}
                                            isShowDescriptionTeacher={true}
                                            isShowLinkDetail={true}
                                            // dataTime={dataTime}
                                        />
                                    </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <TeacherSchedule teacherIdFromParent={item} />
                                    </div>
                                    <div className="doctor-extra-infor">
                                        <InfoAboutTeachers teacherIdFromParent={item} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default DetailCourse;
