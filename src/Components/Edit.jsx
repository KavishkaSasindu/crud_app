import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [getData, setData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        toast.error("Error !", {
          theme: "colored",
          position: "top-right",
          closeOnClick: "true",
        });
        console.log(error);
      });
  }, [id]);

  const handleData = (e) => {
    e.preventDefault();
    const confirm = window.confirm("Do Yo want to update details?");
    if (confirm) {
      axios
        .put(`http://localhost:8000/user/${id}`, getData)
        .then((response) => {
          setData(response.data);
          toast.success("Updated Successfully!", {
            theme: "colored",
            position: "top-right",
            closeOnClick: "true",
          });
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error !", {
            theme: "colored",
            position: "top-right",
            closeOnClick: "true",
          });
          console.log(error);
        });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-center text-2xl m-4">Update Your Details</div>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <form className="space-y-3" onSubmit={handleData}>
            <div>
              <input
                value={getData.id}
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
                <button className="btn-1 bg-yellow-600">Save</button>
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
  );
};

export default Edit;
