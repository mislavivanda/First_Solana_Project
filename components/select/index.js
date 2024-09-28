import { useState } from "react";
import ChevronRight from "../chevronRight";

const SelectInput = ({
  onSelectItemClickCallback,
  selectOptions,
  defaultValue,
}) => {
  const [selectValue, setSelectedValue] = useState(defaultValue);
  const [isDropwdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const handleSelectArrowClick = () => {
    const arrowIcon = document.getElementById(
      "selectArrowContainer"
    ).firstChild;
    arrowIcon.classList.toggle("chevron-icon-active");
    //open dropwdown menu
    if (arrowIcon.classList.contains("chevron-icon-active")) {
      setIsDropdownMenuOpen(true);
    } else setIsDropdownMenuOpen(false);
  };

  const handleOptionSelect = (option) => {
    document
      .getElementById("selectArrowContainer")
      .firstChild.classList.toggle("chevron-icon-active");
    setIsDropdownMenuOpen(false);
    setSelectedValue(option);
    onSelectItemClickCallback && onSelectItemClickCallback();
  };

  return (
    <div className="relative z-40 inline-flex items-center px-5 py-2 rounded-full bg-white">
      <span className="text-font-color-dark font-extrabold text-xl">
        {selectValue}
      </span>
      <div
        id="selectArrowContainer"
        className="hover:cursor-pointer"
        onClick={handleSelectArrowClick}
      >
        <ChevronRight
          stroke="#141414"
          classes="pointer-events-none transition-transform duration-500 ease-in-out"
        />
      </div>
      <div
        className={`absolute z-40 w-max top-12 left-0 text-lg rounded-md bg-white shadow-md ${
          isDropwdownMenuOpen ? "opacity-1" : "opacity-0"
        } transition-opacity duration-500 ease-in-out`}
      >
        {selectOptions.map((option, index) => (
          <div
            key={index}
            className="w-full px-5 py-2 hover:cursor-pointer hover:hover:bg-hover-select transition-all duration-200 ease-in-out"
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectInput;
