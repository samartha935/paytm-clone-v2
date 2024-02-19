import { useState } from "react";
import axios from "axios";

import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  return (
    <>
      <div className="flex flex-col h-screen border border-black bg-gray-600 justify-center">
        <div className="bg-white m-auto p-5 rounded-2xl ">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter information to create an account"} />
          <InputBox
            label={"First Name :"}
            placeHolder={"John"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            label={"Last Name :"}
            placeHolder={"Smith"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            label={"Email :"}
            placeHolder={"xyz@email.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            label={"Username :"}
            placeHolder={"_username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Password :"}
            placeHolder={"minimum 8 characters"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            label={"Sign Up"}
            onClick={async () => {
              let response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  firstName,
                  lastName,
                  email,
                  username,
                  password,
                })
                .catch((err) => {
                  alert(err.response.data.msg);
                });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard")
            }}
          />
          <BottomWarning label={"Already have an account? "} to={"/signin"} link={"Sign In"} />
        </div>
      </div>
    </>
  );
}
