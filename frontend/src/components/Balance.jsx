import axios from "axios";
import { useEffect, useState } from "react";



export function Balance(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
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
      <div className="mx-10 my-4">
        <div className="font-bold">Your Balance : </div>
        <div>Rs {data ? data.balance : "loading....."}</div>
      </div>
    </>
  );
}
