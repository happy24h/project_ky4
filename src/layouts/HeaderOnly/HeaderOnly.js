import Header from '../components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    let homePage = true;
    return (
        <div className={cx('wrapper')}>
            <Header homePage={homePage} />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
