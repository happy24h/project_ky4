import "./ManageFeedback.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeedback } from '~/redux/feedback/apiFeedback';

function ManageFeedback() {
    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();

    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);

    // //B3: Lấy danh sách
    // const listFeedback = useSelector((state) => state.feedback.feedback?.feedbackCurrent?.content);


    //B2: gọi api
    let dataFeedback = {
        "title":"",
        "email":"",
        "status":"",
        "start":"",
        "end":"",
        "limit":4,
        "page":1,
        "sort":""
    };

    useEffect(() => {
        getAllFeedback(dataFeedback, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <table id="feedbacks">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>1</td>
            </tr>
        </table>
    );
}

export default ManageFeedback;
