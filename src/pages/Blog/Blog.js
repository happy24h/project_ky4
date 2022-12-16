import './Blog.scss';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
const cx = classNames.bind(styles);

const dataBlog = [
    {
        image: 'https://blog.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '7 LÝ DO AN TÂM KHI ĐẾN 30SHINE',
        content:
            'Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng loạt các biện pháp.',
    },
    {
        image: 'https://blog.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '7 LÝ DO AN TÂM KHI ĐẾN 30SHINE',
        content:
            'Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng loạt các biện pháp.',
    },
    {
        image: 'https://blog.30shine.com/wp-content/uploads/2021/05/94441749_264609604926201_5080382077019357184_o-300x210.jpg',
        title: '7 LÝ DO AN TÂM KHI ĐẾN 30SHINE',
        content:
            'Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng loạt các biện pháp.',
    },
];

const dataBlogRight = [
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/Icon1.png',
        title: 'DỄ DÀNG ĐẠT THU NHẬP 10-24 TRIỆU',
        content: 'Anh em được hỗ trợ bởi quy trình, công nghệ để tăng năng suất tối đa',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/Icon1.png',
        title: 'DỄ DÀNG ĐẠT THU NHẬP 10-24 TRIỆU',
        content: 'Anh em được hỗ trợ bởi quy trình, công nghệ để tăng năng suất tối đa',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/Icon1.png',
        title: 'DỄ DÀNG ĐẠT THU NHẬP 10-24 TRIỆU',
        content: 'Anh em được hỗ trợ bởi quy trình, công nghệ để tăng năng suất tối đa',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/Icon1.png',
        title: 'DỄ DÀNG ĐẠT THU NHẬP 10-24 TRIỆU',
        content: 'Anh em được hỗ trợ bởi quy trình, công nghệ để tăng năng suất tối đa',
    },
    {
        image: 'https://s3-ap-southeast-1.amazonaws.com/tuyendung.30shine.org/data/images/TuyenDung/Icon1.png',
        title: 'DỄ DÀNG ĐẠT THU NHẬP 10-24 TRIỆU',
        content: 'Anh em được hỗ trợ bởi quy trình, công nghệ để tăng năng suất tối đa',
    },
];
const Blog = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className="blog-content-left">
                    <div className="header-content-blog">Blog</div>
                    {dataBlog &&
                        dataBlog.map((item) => {
                            return (
                                <div>
                                    <div className="row-content-blog">
                                        <div
                                            className="img-content-blog"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="content-blog-text">
                                            <h4>{item.title}</h4>
                                            <span>{item.content}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {/* <div>
                        <div className="row-content-blog">
                            <div className="img-content-blog">img</div>
                            <div className="content-blog-text">
                                <h4>7 LÝ DO AN TÂM KHI ĐẾN 30SHINE</h4>
                                <span>
                                    Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,
                                    30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,
                                    bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng
                                    loạt các biện.
                                </span>
                            </div>
                        </div>
                        <div className="row-content-blog">
                            <div className="img-content-blog">img</div>
                            <div className="content-blog-text">
                                <h4>7 LÝ DO AN TÂM KHI ĐẾN 30SHINE</h4>
                                <span>
                                    Luôn mong muốn mang đến những trải nghiệm trọn vẹn và an tâm nhất cho khách hàng,
                                    30Shine cam kết đồng hành cùng quý khách hàng, chung tay góp sức đẩy lùi dịch bệnh,
                                    bảo vệ sức khoẻ cộng đồng. Tất cả các salon của 30Shine đã & đang thực hiện đồng
                                    loạt các biện.
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="blog-content-right">
                    <div className="header-content-blog">VÌ SAO NÊN CHỌN 30SHINE</div>
                    <div>
                        {dataBlogRight &&
                            dataBlogRight.map((item) => {
                                return (
                                    <div className="row-content-blog-right">
                                        <div className="wrapper-img-content-right">
                                            <div
                                                className="img-content-blog-right"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                        </div>
                                        <div className="content-blog-text-right">
                                            <h3>{item.title}</h3>
                                            <span>{item.content}</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Blog;
