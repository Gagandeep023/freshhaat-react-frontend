import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import useLogout from '../hooks/useLogout';
import { Button } from 'react-bootstrap';

const Nav = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }
    const { search, setSearch } = useContext(DataContext);
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/dashboard/home">Home</Link></li>
                <li><Link to="/dashboard/post">Post</Link></li>
                <li><Link to="/Register">Sign</Link></li>
                <li><Link to="/dashboard/QrCodeLinkage">QRCode</Link></li>

                {/* <li><button onClick={signOut}>Sign out</button></li> */}
                {/* <div className="flexGrow"> */}
                <button   onClick={signOut}>Sign Out</button>


            {/* </div> */}
            </ul>


        </nav>
    )
}

export default Nav
