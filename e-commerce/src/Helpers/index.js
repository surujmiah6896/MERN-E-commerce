import { Navigate } from "react-router-dom";

// const helper = {};

const useRedirect = (url) => {
   return <Navigate to={url} />;
};



export default useRedirect;
