import { useState } from "react";
import axios from "axios";

import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

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
              let response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
            }}
          />
        </div>
      </div>
    </>
  );
}
