import { useState, useEffect } from 'react';
import * as axios from '~/services/adminService';
import './ProfileTeacher.scss';
import { Link } from 'react-router-dom';
function ProfileTeacher({ ...prop }) {
    const [dataProfile, setDataProfile] = useState([]);

    let { teacherId, isShowDescriptionTeacher, isShowLinkDetail } = prop;

    console.log('data profile: --> ', dataProfile);
    useEffect(() => {
        const fetchApi = async () => {
            let res = await axios.getProfileDoctorById(teacherId);
            setDataProfile(res.data);
        };

        fetchApi();
    }, [teacherId]);

    let nameVi = '';
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
        <div className="profile-doctor-container">
            <div className="intro-doctor">
                <div
                    className="content-left"
                    style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                ></div>
                <div className="content-right">
                    <div className="up">{nameVi}</div>
                    <div className="down">
                        {isShowDescriptionTeacher === true ? (
                            <>
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                    <span>{dataProfile.Markdown.description}</span>
                                )}
                            </>
                        ) : (
                            'Thông tin chưa được cập nhật'
                        )}
                    </div>
                </div>
            </div>
            {isShowLinkDetail === true && (
                <div className="view-detail-doctor">
                    <Link to={`/detail-teacher/${teacherId}`}>Xem thêm</Link>
                </div>
            )}
        </div>
    );
}

export default ProfileTeacher;
