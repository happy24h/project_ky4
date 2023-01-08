import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherSchedule from './Schedule/TeacherSchedule';
import InfoAboutTeachers from './Info/InfoAboutTeachers';
import './DetailTeacher.scss';
import { getDetailAccount } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

function DetailTeacher() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailAccount = useSelector((state) => state.account.account?.detailAccount);

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
    }, []);

    return (
        <div className="doctor-detail-container">
            <div className="intro-doctor">
                <div
                    className="content-left"
                    style={{
                        backgroundImage: `url(${
                            detailAccount && detailAccount.thumbnail ? detailAccount.thumbnail : ''
                        })`,
                    }}
                ></div>
                <div className="content-right">
                    <div className="up">{detailAccount?.name}</div>
                    <div className="down">
                        Tiên phong trong lĩnh vực làm đẹp chuyên sâu về ngành làm tóc với sứ mệnh đào tạo nhân viên
                        chuyên nghiệp toàn quốc. Học tập trong môi trường doanh nghiệp thực tế, thực hành liên tục cùng
                        chuyên gia nhiều năm trong doanh nghiệp. Tôi cam kết 100% chất lượng và dịch vụ sản phẩm đều
                        tuyệt vời.
                    </div>
                </div>
            </div>
            <div className="schedule-doctor">
                <div className="content-left">
                    <TeacherSchedule teacherIdFromParent={id} />
                </div>
                <div className="content-right">
                    <InfoAboutTeachers teacherIdFromParent={id} />
                </div>
            </div>
            <div className="detail-infor-doctor">
                {/* {detailTeacher && detailTeacher.Markdown && detailTeacher.Markdown.contentHTML && (
                    <div dangerouslySetInnerHTML={{ __html: detailTeacher.Markdown.contentHTML }}></div>
                )} */}
            </div>
            <div className="comment-doctor"></div>
        </div>
    );
}

export default DetailTeacher;
