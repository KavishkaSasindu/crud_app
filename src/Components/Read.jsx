import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Read = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [getData, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`, getData)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        toast.error("Error", {
          position: "top-right",
          theme: "colored",
          closeOnClick: "true",
        });
      });
  }, [id]);

  return (
    <div>
      <div>
        <table className="w-full text-sm text-left">
          <thead className=" uppercase bg-black text-white text-md ">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b-2">
              <th scope="row" className="px-6 py-4 font-medium">
                {getData.id}
              </th>
              <td className="px-6 py-4">{getData.name}</td>
              <td className="px-6 py-4">{getData.email}</td>
              <td className="px-6 py-4">{getData.phone}</td>
              <td className="px-6 py-4">
                <div className="md:space-x-2 flex flex-col md:flex-row space-y-2">
                  <button
                    className="btn-1 bg-red-600"
                    onClick={() => navigate(`/crud/update/${getData.id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-1 bg-blue-600 "
                    onClick={() => navigate(`/`)}
                  >
                    User List
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Read;
