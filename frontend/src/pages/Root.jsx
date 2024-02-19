import { useNavigate } from "react-router-dom";

export function Root() {

    const navigate = useNavigate()

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-slate-500">
        <button
          type="button"
          className="bg-black text-white m-5 py-3 px-5 rounded-2xl"
          onClick={()=>{
            navigate("/signup")
          }}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="bg-black text-white m-5 py-3 px-5 rounded-2xl"
          onClick={()=>{
            navigate("/signin")
          }}
        >
          Sign In
        </button>
      </div>
    </>
  );
}
