import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Button from '~/components/Button';
import './Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('row-content')}>
                    <div className={cx('content-left')}>
                        <h2>Chúng tôi trân trọng ý kiến của quý khách</h2>
                        <strong>Nếu bạn có gì thắc mắc hãy liên hệ với chúng tôi qua địa chỉ</strong>
                        <ul>
                            <li>
                                <span>Điện thoại</span> <h4>1900.27.27.30</h4>
                            </li>
                            <li>
                                <span>Điạ chỉ</span>{' '}
                                <h4>Số 82 Trần Đại Nghĩa, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội</h4>
                            </li>
                            <li>
                                <span>Email</span> <h4>30shinestore@30shine.com</h4>
                            </li>
                            <li>
                                <span>Thời gian</span> <h4>Tất cả các ngày trong tuần</h4>
                            </li>
                            <li>
                                <span>Mạng xã hội</span>{' '}
                                <h4 className={cx('icon-contact-page')}>
                                    <span>
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </span>
                                </h4>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('content-right')}>
                        <h2>Gửi thắc mắc cho chúng tôi</h2>
                        <strong>
                            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với
                            bạn sớm nhất có thể
                        </strong>
                        <form className="row contact-page">
                            <div className="col c-12 l-12 form-group">
                                <label>Họ và tên *</label>
                                <input type="text" placeholder="Nhập họ và tên của bạn" className="form-control" />
                            </div>
                            <div className="col l-6 c-6 form-group">
                                <label>Số điện thoại *</label>
                                <input
                                    type="number"
                                    placeholder="Nhập số điện thoại của bạn"
                                    className="form-control"
                                />
                            </div>
                            <div className="col l-6 c-6 form-group">
                                <label>Email *</label>
                                <input type="email" placeholder="Nhập địa chỉ email của bạn" className="form-control" />
                            </div>

                            <div className="col c-12 l-12 form-group">
                                <label>Nội dung liên hệ *</label>
                                <textarea
                                    type="text"
                                    placeholder="Nhập nội dung liên hệ"
                                    className="form-control form-textarea"
                                ></textarea>
                            </div>
                        </form>
                        <Button primary className={cx('btn-submit')}>
                            GỬI THÔNG TIN
                        </Button>{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
