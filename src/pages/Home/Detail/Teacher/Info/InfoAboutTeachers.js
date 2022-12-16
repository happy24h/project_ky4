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
                <div className="name-clinic">{infoTeacher && infoTeacher.nameClinic ? infoTeacher.nameClinic : ''}</div>
                <div className="detail-address">
                    {infoTeacher && infoTeacher.addressClinic ? infoTeacher.addressClinic : ''}
                </div>
            </div>
            <div className="content-down">
                {showDetail === false && (
                    <div className="short-infor">
                        Giá dịch vụ:
                        {showDetail.priceTypeData && (
                            <NumberFormat
                                className="currency"
                                value={infoTeacher.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        )}
                        <span className="detail" onClick={() => setShowDetail(!showDetail)}>
                            Xem chi tiết
                        </span>
                    </div>
                )}{' '}
                {showDetail === true && (
                    <>
                        <div className="title-price">Giá dịch vụ:</div>
                        <div className="detail-infor">
                            <div className="price">
                                <span className="left">Giá dịch vụ:</span>
                                <span className="right">
                                    {infoTeacher && infoTeacher.priceTypeData && (
                                        <NumberFormat
                                            className="currency"
                                            value={infoTeacher.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    )}
                                </span>
                            </div>
                            <div className="note">{infoTeacher && infoTeacher.note ? infoTeacher.note : ''}</div>
                        </div>

                        <div className="payment">
                            Khác hàng có thể thanh toán chi phí bằng hình thức:{' '}
                            {infoTeacher && infoTeacher.paymentTypeData ? infoTeacher.paymentTypeData.valueVi : ''}
                        </div>
                        <div className="hide-price">
                            <span onClick={() => setShowDetail(!showDetail)}>Ẩn bảng giá</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default InfoAboutTeachers;
