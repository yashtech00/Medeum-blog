import axios from "axios";  
import { useEffect, useState } from "react";  
import { BACKEND_URL } from "../config";  

export interface Blog {  
    content: string;  
    title: string;  
    id: number;
    image:string  
    author: {  
        name: string;  
    };  
}  

export const useBlog = ({ id }: { id: string }) => {  
    const [loading, setLoading] = useState(true);  
    const [blog, setBlog] = useState<Blog | null>(null); // Initial state as null  
  
    useEffect(() => {  
        const token = localStorage.getItem("token");  
        axios  
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {  
                headers: {  
                    Authorization: `Bearer ${token}` ,  
                },  
            })  
            .then((response) => {  
                setBlog(response.data.blog);  
                setLoading(false);  
            })  
            .catch((e) => { // Add error handling  
                console.error(e);  
                setLoading(false);  
            });  
    }, [id]);  
  
    return {  
        loading,  
        blog,  
    };  
};  

export const useBlogs = () => {  
    const [loading, setLoading] = useState(true);  
    const [blogs, setBlogs] = useState<Blog[]>([]); // Initialize as an empty array  

    useEffect(() => {  
        const token = localStorage.getItem("token");  
        axios  
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, {  
                headers: {  
                    Authorization:`Bearer ${token}`,  
                },  
            })  
            .then((response) => {  
                console.log(response.data.blogs, "after bulk");  
                setBlogs(response.data.blogs);  
                setLoading(false);  
            })  
            .catch((e) => { // Add error handling  
                console.error(e);  
                setLoading(false);  
            });  
    }, []);  

    return {  
        loading,  
        blogs,  
    };  
};