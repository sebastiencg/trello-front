import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const BackUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    return navigate(`/board/${id}`);

    }, [navigate,id]);
  return (
    <>
      <p>
        <Link className="boards-btn btn no-decoration" to="/boards/">
          if redirection no work click here
        </Link>
      </p>
    </>

  );
};

export default BackUp;

