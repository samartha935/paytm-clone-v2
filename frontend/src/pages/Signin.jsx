import { useState } from "react";
import axios from "axios";

import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-screen border border-black bg-gray-600 justify-center">
        <div className="bg-white m-auto p-5 rounded-2xl ">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter information to Sign in"} />
          <InputBox
            label={"Username :"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Password :"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            label={"Sign In"}
            onClick={async () => {
              let response = await axios
                .post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password,
                })
                .catch((err) => {
                  alert(err.response.data.msg);
                });
              localStorage.setItem("token", response.data.token);
              console.log(response.data.token)
              navigate("/dashboard");
            }}
          />
          <BottomWarning label={"First time here ?"} to={"/signup"} link={"Sign Up"} />
        </div>
      </div>
    </>
  );
}
