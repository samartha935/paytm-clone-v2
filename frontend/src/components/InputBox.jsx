export function InputBox(props) {
  return (
    <>
    <div className="pt-3">
      <div className="text-bold font-medium text-sm ">{props.label}</div>
      <input
        type="text"
        placeholder={props.placeHolder}
        onChange={props.onChange}
        className="border border-gray-500 rounded-lg pl-2"
      ></input>
      </div>
    </>
  );
}
