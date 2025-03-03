import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import Appbar from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return <div><Appbar /> 
    <div className="h-screen flex mt-52 justify-center">
      <div className="flex justify-start">
      <Spinner/>
      </div>
    </div>
    </div>
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};


