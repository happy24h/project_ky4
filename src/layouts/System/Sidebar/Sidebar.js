import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faLightbulb, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
// import { faBlogger } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);
function Sidebar() {
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Người dùng',
            data: [
                {
                    title: 'Danh sách người dùng',
                    to: '/system/manage-user',
                },
                {
                    title: 'Thêm thông tin',
                    to: '/system/manage-user',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faUserGraduate} />,
            title: 'Nhân viên',
            data: [
                {
                    title: 'Thêm lịch hẹn',
                    to: '/system/manage-user',
                },
                {
                    title: 'Thêm thông tin nhân viên',
                    to: '/system/manage-user',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faCircleInfo} />,
            title: 'Thông tin',
            data: [
                {
                    title: 'Cơ sở cắt tóc',
                    to: '/system/manage-user',
                },
                {
                    title: 'Dịch vụ',
                    to: '/system/manage-user',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faLightbulb} />,
            title: 'Học tập',
            data: [
                {
                    title: 'React CRUD',
                    to: '/system/manage-user',
                },
                {
                    title: 'Redux CRUD',
                    to: '/system/manage-user',
                },
            ],
        },
    ];
    return (
        <nav className={cx('sidebar')}>
            <div className={cx('logo')}>
                <span>Happy24h</span>
            </div>
            <div className={cx('sidebar-menu')}>
                {MENU_ITEMS.map((item, index) => (
                    <MenuItem key={index} title={item.title} icon={item.icon} data={item.data} />
                ))}
            </div>
        </nav>
    );
}

export default Sidebar;
