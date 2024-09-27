
const InputField = ({
  placeholder,
  id,
  type,
  classes,
  disable,
  step,
  min,
  onInput,
  value,
}) => {
  return (
    <>
      <input
        className={`shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline ${classes}`}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disable}
        onInput={onInput}
        step={step}
        min={min}
        value={value}
      />
    </>
  );
};

export default InputField;
