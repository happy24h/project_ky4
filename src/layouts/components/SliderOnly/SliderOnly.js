import classNames from 'classnames/bind';
import styles from './SliderOnly.module.scss';
const cx = classNames.bind(styles);
function SliderOnly() {
    return <div className={cx('wrapper')}></div>;
}

export default SliderOnly;
