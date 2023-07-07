/* eslint-disable react/prop-types */
function Input({ placeholder, type = "text" }) {
  return <input type={type} placeholder={placeholder} />;
}

export default Input;
