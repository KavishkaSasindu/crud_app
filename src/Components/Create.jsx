import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const [getData, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user", getData)
      .then((response) => {
        setData(response.data);
        toast.success("Your Data is added successfully !", {
          theme: "colored",
          position: "top-right",
          closeOnClick: "true",
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Couldn't add user ", {
          theme: "colored",
          position: "top-right",
          closeOnClick: "true",
        });
        console.log(error);
      });
  };

  return (
    <div>
      <div className="space-y-5">
        <div>
          <h1 className="text-center text-2xl font-semibold m-5">Add User</h1>
        </div>
        <div>
          <div className="flex justify-center items-center">
            <form className="space-y-3" onSubmit={handleData}>
              <div>
                <input
                  type="text"
                  placeholder="User ID"
                  className="input-1"
                  disabled
                />
              </div>
              <div>
                <input
                  value={getData.name}
                  type="text"
                  placeholder="Name"
                  className="input-1"
                  required
                  onChange={(e) =>
                    setData({
                      ...getData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  value={getData.email}
                  placeholder="Email"
                  className="input-1"
                  required
                  onChange={(e) =>
                    setData({
                      ...getData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  value={getData.phone}
                  type="text"
                  placeholder="Phone"
                  className="input-1"
                  required
                  onChange={(e) =>
                    setData({
                      ...getData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <button className="btn-1 bg-yellow-600">Add User</button>
                </div>
                <div>
                  <button
                    className="btn-1 bg-slate-500"
                    onClick={() => navigate(`/`)}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
