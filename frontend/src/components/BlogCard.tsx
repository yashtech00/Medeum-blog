import React from "react";
import { Link } from "react-router";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id:string;
}

const BlogCard = ({
    id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className=" border-b pb-4 p-4  border-slate-200 w-screen max-w-screen-md cursor-pointer">
      <div>
        <div className="flex">
          <Avatar name={authorName} />
          <div className=" font-light pl-2 text-sm flex justify-center flex-col">
            {authorName}{" "}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className=" text-slate-500 font-light pl-2 text-sm flex justify-center flex-col ">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-bold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </div>
    </Link>
  );
};
export function Circle() {
  return <div className=" h-1 w-1 rounded-full bg-gray-700 "></div>;
}
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden rounded-full bg-gray-600 text-white`}
    >
      <span className={`${size==="small"?"text-xs":"text-md"} text-sm font-extralight text-white  mb-1`}>
        {name[0]}
      </span>
    </div>
  );
}

export default BlogCard;
