import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header >
            <ul className='container'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/courses'>Courses</Link></li>
                <li><a href="https://t.me/asobirov">telegram</a></li>
                <li><a href="https://github.com/asobirov">GitHub</a></li>
            </ul>
        </header>
    )
}

export default Header
