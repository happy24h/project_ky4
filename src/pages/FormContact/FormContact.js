import './FormContact.scss';
function FormContact() {
    return (
        <div className="wrapper-form-contact">
            <div className="container">
                <div className="content">
                    <div className="left">
                        <div className="details address">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="topic">Address</div>
                            <div className="text-one">Mathikere, Bangalore</div>
                            <div className="text-two">India 560054</div>
                        </div>
                        <div className="details phone">
                            <i className="fas fa-phone-alt"></i>
                            <div className="topic">Phone</div>
                            <div className="text-one">+91537 2638 645</div>
                            <div className="text-two">+91537 2638 645</div>
                        </div>
                        <div className="details email">
                            <i className="fas fa-envelope"></i>
                            <div className="topic">Email</div>
                            <div className="text-one">tivotalhelp@gmail.com</div>
                            <div className="text-two">info.tivotal@gmail.com</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="topic-text">Send us a message</div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, error! Cumque placeat nulla
                            eligendi corrupti.
                        </p>
                        <form action="#">
                            <div className="input-box">
                                <input type="text" placeholder="Enter your name" />
                            </div>
                            <div className="input-box">
                                <input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="input-box">
                                <input type="tel" placeholder="Enter your phone number" />
                            </div>
                            <div className="input-box message-box">
                                <textarea name="message" placeholder="Message"></textarea>
                            </div>
                            <div className="button">
                                <input type="button" value="Send Message" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormContact;
