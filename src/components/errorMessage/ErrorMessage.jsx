import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <img
      alt="Error Photo"
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "auto",
      }}
      src={img}
    />
  );
};

export { ErrorMessage };
