import { Link } from 'react-router-dom';
import './Register.scss';
function CreateSuccess() {
    return (
        <div className="wrapper">
            <div className="container-login">
                <div className="heading-success">
                    <div>
                        Chưa hoàn thiện xong phần tạo tài khoản.
                        <p>Vui lòng quay lại sau!</p>
                        <div className="field signupfield">
                            <span className="linkfield text-link">
                                <Link to="/login">Already signed up? Login here</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSuccess;
