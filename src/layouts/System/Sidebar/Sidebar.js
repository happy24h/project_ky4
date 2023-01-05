import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
// import { faBlogger } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
function Sidebar() {
    const { t } = useTranslation();
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: t('systemSidebar.users.title'),
            data: [
                {
                    title: t('systemSidebar.users.data.title1'),
                    to: '/system/manage-user',
                },
                {
                    title: t('systemSidebar.users.data.title2'),
                    to: '/system/manage-blog',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faUserGraduate} />,
            title: t('systemSidebar.employees.title'),
            data: [
                {
                    title: t('systemSidebar.employees.data.title1'),
                    to: '/system/manage-schedule',
                },
                {
                    title: t('systemSidebar.employees.data.title2'),
                    to: '/system/manage-branch',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faCircleInfo} />,
            title: t('systemSidebar.information.title'),
            data: [
                {
                    title: t('systemSidebar.information.data.title1'),
                    to: '/system/manage-booking',
                },
                {
                    title: t('systemSidebar.information.data.title2'),
                    to: '/system/manage-user',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: t('systemSidebar.feedback.title'),
            data: [
                {
                    title: t('systemSidebar.feedback.data.title1'),
                    to: '/system/manage-feedback',
                },
                {
                    title: t('systemSidebar.feedback.data.title2'),
                    to: '/system/manage-service',
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
