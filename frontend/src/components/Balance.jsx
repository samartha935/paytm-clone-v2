export function Balance(props) {
  return (
    <>
      <div>
        <div className="font-bold">Your Balance : </div>
        <div>Rs {props.balance}</div>
      </div>
    </>
  );
}
