import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";

const Publish = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const handlePublish = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-10">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={handlePublish}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-green-900"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
          <div className="px-4 py-2 bg-white rounded-t-lg ">
            <label className="sr-only">Your comment</label>
            <textarea
              onChange={onChange}
              id="comment"
              rows={8}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 focus:outline-none "
              placeholder="Write a article..."
              required
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Publish;
