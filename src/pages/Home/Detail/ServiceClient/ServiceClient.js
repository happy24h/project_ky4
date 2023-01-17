import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherSchedule from './Schedule/EmployeeSchedule';
// import './ServiceClient.scss';
import { getAllAccount, getDetailAccount } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

function ServiceClient() {
    // const { id } = useParams();
    // const dispatch = useDispatch();

    // const user = useSelector((state) => state.auth.login?.currentUser);

    // const detailAccount = useSelector((state) => state.account.account?.detailAccount);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent.content);
    // const navigate = useNavigate();

    useEffect(() => {
        getAllAccount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {listAccount &&
                listAccount.map((item, index) => {
                    return (
                        <div className="doctor-detail-container">
                            <div className="intro-doctor">
                                <div
                                    className="content-left"
                                    style={
                                        item?.thumbnail && {
                                            backgroundImage: `url(${item.thumbnail})`,
                                        }
                                    }
                                ></div>
                                <div className="content-right">
                                    <div className="up">{item?.accounts_name}</div>
                                    <div className="down">
                                        Tiên phong trong lĩnh vực làm đẹp chuyên sâu về ngành làm tóc với sứ mệnh đào
                                        tạo nhân viên chuyên nghiệp toàn quốc. Học tập trong môi trường doanh nghiệp
                                        thực tế, thực hành liên tục cùng chuyên gia nhiều năm trong doanh nghiệp. Tôi
                                        cam kết 100% chất lượng và dịch vụ sản phẩm đều tuyệt vời.
                                    </div>
                                </div>
                            </div>
                            <TeacherSchedule />

                            <div className="detail-infor-doctor">
                                {/* {detailTeacher && detailTeacher.Markdown && detailTeacher.Markdown.contentHTML && (
                    <div dangerouslySetInnerHTML={{ __html: detailTeacher.Markdown.contentHTML }}></div>
                )} */}
                            </div>
                            <div className="comment-doctor"></div>
                        </div>
                    );
                })}
        </div>
    );
}

export default ServiceClient;
