import { Link } from "react-router-dom"

export function BottomWarning(props){
    return(
        <>
        <div className="flex pt-2 text-sm justify-center">
            <div>Already have an account? </div>
            <Link className="underline pl-2 " to={props.to} >{props.label}</Link>
            </div>
        </>
    )
}