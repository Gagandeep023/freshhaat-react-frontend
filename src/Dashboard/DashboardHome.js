import Feed from './Feed';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import './dashboard.css';

const DashboardHome = () => {
   const { searchResults, fetchError, isLoading } = useContext(DataContext);

    return (
        <main className="DashboardHome">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed productDetail={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default DashboardHome
