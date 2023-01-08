import { useEffect, useState } from 'react';
import * as axios from '~/services/adminService';
import NumberFormat from 'react-number-format';
import './InfoAboutTeachers.scss';

function InfoAboutTeachers({ teacherIdFromParent }) {
    const [infoTeacher, setInfoTeacher] = useState();
    const [showDetail, setShowDetail] = useState(false);
    console.log('state--->', infoTeacher);
    useEffect(() => {
        const fetchApi = async () => {
            let res = await axios.getExtraInforDoctorById(teacherIdFromParent);
            setInfoTeacher(res.data);
        };
        fetchApi();
    }, [teacherIdFromParent]);

    return (
        <div className="doctor-extra-infor-container">
            <div className="content-up">
                <div className="text-address">Địa chỉ</div>
                <div className="name-clinic">Cơ sở hà nội</div>
                <div className="detail-address">Lê Duẩn - Hai Bà Trưng - Hà Nội</div>
            </div>
            <div className="content-down">
                <>
                    <div className="title-price">Giá dịch vụ:</div>
                    <div className="detail-infor">
                        <div className="price">
                            <span className="left">Giá dịch vụ:</span>
                            <span className="right">
                                <NumberFormat
                                    className="currency"
                                    value="50000"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            </span>
                        </div>
                        <div className="note">Học tập là con mắt của trí tuệ.</div>
                    </div>

                    <div className="payment">Khác hàng có thể thanh toán chi phí bằng hình thức: Tiền mặt</div>
                    <div className="hide-price">
                        <span onClick={() => setShowDetail(!showDetail)}>Ẩn bảng giá</span>
                    </div>
                </>
            </div>
        </div>
    );
}

export default InfoAboutTeachers;
