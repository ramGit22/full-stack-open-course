import "../index.css";

const Notification = ({ message, error }) => {
  const className = error ? "errormessage" : "message";
  return <div className={className}>{message}</div>;
};

export default Notification;
