import axios from "axios";
import { useEffect, useState } from "react";

export function User() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

    const intervalId = setInterval(fetchData, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="border-2 border-black bg-gray-400 mx-10">
        {data ? (
          data.users.map((user) => {
            return (
              <div
                className="border-2 border-black flex justify-between m-4 bg-slate-100"
                key={user._id}
              >
                <div className="pl-2">
                  {user.firstName} {user.lastName} <br />
                  {user.username}
                </div>
                <button
                  type="button"
                  className="bg-gray-500 text-white p-1 px-4"
                >
                  Send
                </button>
              </div>
            );
          })
        ) : (
          <div>Loading.....</div>
        )}
      </div>
    </>
  );
}
