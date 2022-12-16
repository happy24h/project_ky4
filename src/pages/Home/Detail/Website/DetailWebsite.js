import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as axios from '~/services/adminService';
import _ from 'lodash';
import ProfileTeacher from '../Course/ProfileTeacher';
import TeacherSchedule from '../Teacher/Schedule/TeacherSchedule';
import InfoAboutTeachers from '../Teacher/Info/InfoAboutTeachers';
import './DetailWebsite.scss';
function DetailWebsite() {
    const [state, setState] = useState({});
    let { id } = useParams();
    console.log('id--->', id);
    console.log('-----> ', state);

    useEffect(() => {
        const fetchApi = async () => {
            let res = await axios.getAllDetailClinicById({ id: id });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrWebsiteId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arrData = data.doctorClinic;
                    if (arrData && arrData.length > 0) {
                        arrData.map((item) => {
                            return arrWebsiteId.push(item.doctorId);
                        });
                    }
                }
                setState({
                    dataDetailWebsite: res.data,
                    arrWebsiteId: arrWebsiteId,
                });
                console.log(data);
            }
        };
        fetchApi();
    }, [id]);

    let { dataDetailWebsite, arrWebsiteId } = state;

    return (
        <div className="detail-specialty-container">
            <div className="detail-specialty-body">
                <div className="description-specialty">
                    {dataDetailWebsite && !_.isEmpty(dataDetailWebsite) && (
                        <>
                            <div>{dataDetailWebsite.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailWebsite.descriptionHTML }}></div>
                        </>
                    )}
                </div>
                {arrWebsiteId &&
                    arrWebsiteId.length > 0 &&
                    arrWebsiteId.map((item, index) => {
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

export default DetailWebsite;
