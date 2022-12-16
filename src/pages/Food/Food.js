import ContentSlider from './components/ContentSlider/ContentSlider';
import classNames from 'classnames/bind';
import styles from './Food.module.scss';
// import Slider from '~/layouts/components/Slider';
const cx = classNames.bind(styles);
function Food() {
    return (
        <div className={cx('wrapper')}>
            {/* <Slider /> */}
            <div className={cx('content')}>
                <ContentSlider />
            </div>
        </div>
    );
}

export default Food;
