import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './MenuItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDashboardBooking } from '~/redux/dashboard/booking/dashboardBookingSlice';
import { cleanDashboardOder } from '~/redux/dashboard/order/dashboardOrderSlice';

const cx = classNames.bind(styles);
function MenuItem({ title, icon, data }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const checkPermissionParrent  = () => {
        let checkRole = false;
        data.map((item) => (
            item.permission.map(permission => (
                user.roles.map( function(item){
                    if(item == permission){
                        checkRole = true;
                    }
                }
            ))
        )));
        return checkRole;
    };

    const checkPermissionChildren  = (permission) => {
        let checkRole = false;
        permission.map(permission => (
            user.roles.map( function(item){
                if(item == permission){
                    checkRole = true;
                }
            }
        )));
        return checkRole;
    };
    const cleanDataBeforRefresh = ()=>{
        dispatch(cleanDashboardBooking());
        dispatch(cleanDashboardOder());
    }
    return (
        <ul>
            <li style={{display: checkPermissionParrent() == true ? "" : "none"}}
                className={cx('menu-item')}>
                <div className={cx('title-icon')}>
                    <span className={cx('icon')}>{icon}</span>
                    <span className={cx('title')}>{title}</span>
                </div>
                <ul className={cx('list-item')}>
                    {data.map((item, index) => (
                        <NavLink key={index} onClick={cleanDataBeforRefresh} className={cx('link-item')} to={item.to} style={{display: checkPermissionChildren(item.permission) == true ? "" : "none"}}>
                            {item.title}
                        </NavLink>
                    ))}
                </ul>
            </li>
        </ul>
    );
}

export default MenuItem;
