export function InputBox(props) {
  return (
    <>
      <div className="text-bold font-medium text-sm ">label</div>
      <input
        type="text"
        placeholder={props.placeHolder}
        className="border border-gray-500 rounded-lg"
      ></input>
    </>
  );
}
