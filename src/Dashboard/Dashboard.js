import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route } from 'react-router-dom';
import './dashboard.css';
import DashboardLayout from '../components/DashboardLayout';
import DashboardHome from './DashboardHome';


function Dashboard() {

  return (
   
    <Route path="/dashboard" element={<DashboardLayout />}>
    <Route  path="/dashboard/home" element={<DashboardHome />} />
    <Route  path="/dashboard/post" element={<NewPost/>} />
    <Route path="/dashboard/edit/:id" element={<EditPost/>} />
    <Route path="/dashboard/post/:id" element={<PostPage/>} />
    <Route path="/dashboard/about" element={<About/>} />
    <Route path="dashboard/*" element={<Missing/>} />
  </Route>
  );
}

export default Dashboard;
