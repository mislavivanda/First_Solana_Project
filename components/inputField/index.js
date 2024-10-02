const InputField = ({
  placeholder,
  id,
  type,
  classes,
  disable,
  step,
  min,
  onChange,
  onKeyDown,
  value,
}) => {
  return (
    <>
      <input
        className={`block outline-none w-full pt-2 pb-2 pl-3 pr-3 focus:border-primary-color border-[2px] border-solid transition-colors rounded-md ${classes}`}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disable}
        onChange={onChange}
        onKeyDown={onKeyDown}
        step={step}
        min={min}
        value={value}
      />
    </>
  );
};

export default InputField;
