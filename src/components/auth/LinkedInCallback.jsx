import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const LinkedInCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    
    if (params.code) {
      console.log("LinkedIn Auth Code:", params.code);
    }

    navigate("/");
  }, [navigate]);

  return <div>LinkedIn authentication in progress...</div>;
};

export default LinkedInCallback;
