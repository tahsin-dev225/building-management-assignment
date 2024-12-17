import { Link } from 'react-router-dom';
import logoo from '../../../assets/Frame 7.png'

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-slate-900 text-slate-100 lg:px-16 p-10">
                <aside className='mx-auto'>
                    <img src={logoo} alt="" />
                    <p>
                    ACME Industries Ltd.
                    <br />
                    Providing reliable tech since 1992
                    </p>
                </aside>
                <nav className='px-5'>
                    <h6 className="footer-title">Company</h6>
                    <Link to='/' className="link link-hover">About us</Link>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav className='px-5'>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;