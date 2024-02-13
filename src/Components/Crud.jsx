import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Crud = () => {
  const navigate = useNavigate();
  const [getData, setData] = useState([
    {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteUser = (id) => {
    const confirm = window.confirm("Do you want to continue?");
    if (confirm) {
      axios
        .delete(`http://localhost:8000/user/${id}`)
        .then((res) => {
          location.reload();
          toast.success("Removed data successfully!", {
            theme: "colored",
            position: "top-right",
            closeOnClick: "true",
          });
        })
        .catch((error) => {
          toast.error("Error!", {
            theme: "colored",
            position: "top-right",
            closeOnClick: "true",
          });
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-2">
        <div>
          <h1 className="text-center p-5 text-xl">My CRUD Application</h1>
        </div>
        <div className="mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] mx-auto">
            <div>
              <button
                className="btn-1 bg-blue-600 m-3"
                onClick={() => navigate(`/crud/create`)}
              >
                Add User
              </button>
            </div>
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
                {getData?.map((items, i) => (
                  <tr className="bg-white border-b-2" key={i}>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {items.id}
                    </th>
                    <td className="px-6 py-4">{items.name}</td>
                    <td className="px-6 py-4">{items.email}</td>
                    <td className="px-6 py-4">{items.phone}</td>
                    <td className="px-6 py-4">
                      <div className="md:space-x-2 flex flex-col md:flex-row space-y-2">
                        <button
                          className="btn-1 bg-red-600"
                          onClick={() => navigate(`/crud/update/${items.id}`)}
                        >
                          Update
                        </button>
                        <button
                          className="btn-1 bg-fuchsia-600 "
                          onClick={() => deleteUser(items.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn-1 bg-green-600"
                          onClick={() => navigate(`/crud/read/${items.id}`)}
                        >
                          Read
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;
