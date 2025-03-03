
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";

import { useBlogs } from "../hooks";

 const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        </div>
    }
    const handleSearch =()=>{

    }
    return <div  className="">
        <Appbar />
        <div className="flex justify-center">
        <div  className=" ">
        <div className=" justify-center m-4">
            <div className="mb-4">
                <input placeholder="Search" onChange={handleSearch} className="p-2 border-2 border-gray-400 rounded-full w-full  "/>

            </div>
            <div>
                fields
            </div>
        </div>
        <div >
            
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
        </div>
        </div>
    </div>
}

export default Blogs