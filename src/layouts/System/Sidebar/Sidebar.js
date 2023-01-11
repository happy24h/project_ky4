import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDay,
    faCartShopping,
    faCircleInfo,
    faComment,
    faHandScissors,
    faNetworkWired,
    faNewspaper,
    faTicket,
    faUser,
    faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
// import { faBlogger } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function Sidebar() {
    const { t } = useTranslation();
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: t('systemSidebar.accounts.title'),
            data: [
                {
                    title: t('systemSidebar.accounts.data.list'),
                    to: '/system/manage-user',
                    permission: ['ADMIN', 'RECEPTIONISTS'],
                },
                {
                    title: t('systemSidebar.accounts.data.create'),
                    to: '/system/manage-user/add',
                    permission: ['ADMIN'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} />,
            title: t('systemSidebar.blog.title'),
            data: [
                {
                    title: t('systemSidebar.blog.data.list'),
                    to: '/system/manage-blog/add',
                    permission: ['ADMIN', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.blog.data.create'),
                    to: '/system/manage-blog',
                    permission: ['ADMIN', 'CUSTOMER_CARE'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faCalendarDay} />,
            title: t('systemSidebar.booking.title'),
            data: [
                {
                    title: t('systemSidebar.booking.data.list'),
                    to: '/system/manage-booking',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.booking.data.create'),
                    to: '/system/manage-booking/add',
                    permission: ['ADMIN'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faNetworkWired} />,
            title: t('systemSidebar.branch.title'),
            data: [
                {
                    title: t('systemSidebar.branch.data.list'),
                    to: '/system/manage-branch',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.branch.data.create'),
                    to: '/system/manage-branch/add',
                    permission: ['ADMIN'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faHandScissors} />,
            title: t('systemSidebar.service.title'),
            data: [
                {
                    title: t('systemSidebar.service.data.list'),
                    to: '/system/manage-service',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.service.data.create'),
                    to: '/system/manage-service/add',
                    permission: ['ADMIN'],
                },
                {
                    title: t('systemSidebar.type_service.data.list'),
                    to: '/system/manage-type-service',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.type_service.data.create'),
                    to: '/system/manage-type-service/add',
                    permission: ['ADMIN'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faComment} />,
            title: t('systemSidebar.feedback.title'),
            data: [
                {
                    title: t('systemSidebar.feedback.data.list'),
                    to: '/system/manage-feedback',
                    permission: ['ADMIN', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.feedback.data.create'),
                    to: '/system/manage-feedback/add',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faTicket} />,
            title: t('systemSidebar.voucher.title'),
            data: [
                {
                    title: t('systemSidebar.voucher.data.list'),
                    to: '/system/manage-voucher',
                    permission: ['ADMIN'],
                },
                {
                    title: t('systemSidebar.voucher.data.create'),
                    to: '/system/manage-voucher/add',
                    permission: ['ADMIN'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faComment} />,
            title: t('systemSidebar.feedback.title'),
            data: [
                {
                    title: t('systemSidebar.feedback.data.list'),
                    to: '/system/manage-feedback',
                    permission: ['ADMIN', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.feedback.data.create'),
                    to: '/system/manage-feedback/add',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faCartShopping} />,
            title: 'Hóa đơn',
            data: [
                {
                    title: 'Danh sách hóa đơn',
                    to: '/system/manage-order',
                    permission: ['ADMIN'],
                },
            ],
        },
    ];

    const user = useSelector((state) => state.auth.login?.currentUser);

    // const checkPermission  = () => {
    //     let checkRole = true;
    //     item.data.permission.map(permission => (
    //         user.roles.map(item => (
    //             item === permission ? "block" : "none"
    //         ))
    //     ));
    //     return checkRole;
    // };

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
