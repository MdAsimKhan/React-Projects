import bars from "./bars.svg";
const Spinner = () => {
  return (
    <div className="text-center pb-3">
      <img src={bars} alt="spinner" style={{ width: "30px", height: "30px" }} />
    </div>
  );
};
export default Spinner;
