import { useState } from 'react';
import './FormLogin.scss';
import images from '~/assets/images';
import SignIn from './SignIn';
import SignUp from './SignUp';

function FormLogin() {
    const [modeForm, setModeForm] = useState(true);
    console.log('check mode form >>', modeForm);
    return (
        <div className="wrapper-form-login">
            <div className={modeForm ? 'container' : 'container sign-up-mode'}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <SignIn />
                        <SignUp />
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Not a User ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!
                            </p>
                            <button onClick={() => setModeForm(false)} className="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>

                        <img src={images.imageTransparent1} class="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Already a User ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.
                            </p>
                            <button onClick={() => setModeForm(true)} className="btn transparent" id="sign-in-btn">
                                Login
                            </button>
                        </div>
                        <img src={images.imageTransparent2} class="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;
