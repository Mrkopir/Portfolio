export default function ContactPageData() {
    return (
        <div className="ContactPageDataContainer">
            <div className="ContactTopSection">
                <h2>Contacts</h2>
                <div className="ContactTopItemsRow">
                    <div className="ContactItem">
                        <h3>Phone</h3>
                        <p>+380982571771</p>
                    </div>
                    <div className="ContactItem">
                        <h3>Email</h3>
                        <p>mrkopir@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="ContactBottomRow">
                <div className="MessengerColumn">
                    <h2>Messengers</h2>
                    <a href="https://t.me/DiSp4tCheer"><p>Telegram</p></a>
                </div>
                <div className="SocialColumn">
                    <h2>Social Networks</h2>
                    <div className="SocialColumnRow">
                        <a href="https://www.instagram.com/vova_chetvertinovski?igsh=MW01ZnZ4cmp4d2ZxMw%3D%3D&utm_source=qr"><p>Instagram</p></a>
                        <a href="https://www.linkedin.com/in/vova-chetvertynivskyi-095706370"><p>LinkedIn</p></a>
                        <a href="https://github.com/Mrkopir"><p>GitHub</p></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
