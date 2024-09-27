import { useState } from "react";
const TagsInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const maxTagLength = 15;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (inputValue.trim().length > maxTagLength) {
        alert(`Tag should be ${maxTagLength} characters or less.`);
        return;
      }

      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  // Remove tag by index
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove)); // Remove tag by index
  };

  return (
    <div className="mb-4">
      <label className="mb-1 inline-block font-semibold">Tags</label>
      <div className="flex-col">
        <input
          className="block outline-none w-full pt-2 pb-2 pl-3 pr-3 focus:border-primary-color border-[2px] border-solid transition-colors rounded-md"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a tag and press Enter"
        />
        <div className="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center p-1">
              {tag}
              <span
                className="text-lg text-primary-color cursor-pointer ml-[2px]"
                onClick={() => removeTag(index)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
