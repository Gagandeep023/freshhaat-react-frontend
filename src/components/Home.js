import { useNavigate,  } from "react-router-dom";
function Home() {
    const navigate = useNavigate();

        navigate('/dashboard/home');
      }

export default Home
