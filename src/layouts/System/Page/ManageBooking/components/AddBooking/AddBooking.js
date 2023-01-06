import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';

// import './ManageSchedule.scss';
import { useTranslation } from 'react-i18next';
import { getAllAccount } from '~/redux/apiRequest';
import { getBranch } from '~/redux/branch/apiBranch';
import { createBooking } from '~/redux/booking/apiBooking';
import { useNavigate } from 'react-router-dom';
let dataBtnTime = [
    { name: '08:00', time: '8', isActive: false },
    { name: '09:00', time: '9', isActive: false },
    { name: '10:00 ', time: '10', isActive: false },
    { name: '11:00 ', time: '11', isActive: false },
    { name: '13:00 ', time: '13', isActive: false },
    { name: '14:00', time: '14', isActive: false },
    { name: '15:00 ', time: '15', isActive: false },
    { name: '16:00', time: '16', isActive: false },
];
function AddBooking() {
    const [dataTime, setDataTime] = useState([...dataBtnTime]);
    const { t } = useTranslation();
    const [state, setState] = useState({
        currentDate: '',
        timeBooking: '',
        accountId: '',
        branchId: '',
    });

    console.log('check---state', state);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent?.content);
    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);
    const navigate = useNavigate();

    console.log('check list >>>', listAccount);
    console.log('check branch >>>', listBranch);

    let dataAccount = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        start: '',
        end: '',
        page: 1,
        limit: 15,
        sort: 'asc',
        role_id: '1',
        member_ship_class_id: '',
        status: '',
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getBranch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickBtnTime = (item) => {
        // setActive(!active);
        // alert('time' + item);

        setState((prev) => ({ ...prev, timeBooking: item }));
        const dataTime2 = dataTime.map((data) => {
            if (data.time === item) {
                data.isActive = !data.isActive;
                // return data;
            }
            return data;
            // return data;
            // return data;
        });
        setDataTime(dataTime2);
    };

    let today = new Date();
    if (state?.currentDate) {
        today = new Date(state?.currentDate);
    } else {
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log('today', today);

    const handleSaveSchedule = () => {
        const dataBooking = {
            date_booking: today,
            time_booking: state?.timeBooking,
            employee_id: +state?.accountId,
            branch_id: +state?.branchId,
        };

        console.log('data booking', dataBooking);
        createBooking(dataBooking, dispatch, user?.accessToken, navigate);
    };

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">QUẢN LÝ KẾ HOẠCH THỜI GIAN CỦA NHÂN VIÊN</div>
            {/* <h1>{t('manageUser.title')}</h1> */}
            <div className="container">
                <div className="row">
                    <div className="col l-6 form-group">
                        <label>Chọn nhân viên </label>

                        <select className="form-control l-12" name="accountId" onChange={handleOnchangeInput}>
                            <option value="">Choose...</option>;
                            {listAccount.map((item, index) => {
                                return (
                                    <option key={index} value={item.accounts_id}>
                                        {item.accounts_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col l-6 form-group">
                        <label>Chọn chi nhánh </label>

                        <select className="form-control l-12" name="branchId" onChange={handleOnchangeInput}>
                            <option value="">Choose...</option>;
                            {listBranch.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.address}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col l-6 form-group">
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            className="form-control"
                            name="currentDate"
                            dateformat="dd-mm-YY"
                            required
                            onChange={handleOnchangeInput}
                        />
                    </div>
                    {/* <div className="col l-6 form-group">
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            className="form-control"
                            name="currentDate"
                            dateformat="dd-mm-YY"
                            required
                            onChange={handleOnchangeInput}
                        />
                    </div> */}
                    <div className="col l-12 pick-hour-container">
                        {dataTime.map((item, index) => {
                            return (
                                <button
                                    className={item.isActive === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                    onClick={() => handleClickBtnTime(item.time)}
                                    key={index}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="col l-12 ">
                        <Button primary onClick={() => handleSaveSchedule()}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBooking;
