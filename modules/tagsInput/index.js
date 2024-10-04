import { useState } from "react";
import { FormGroup, InputField, Label } from "../../components";
const TagsInput = ({ tags, setTags, noLabel }) => {
  const [inputValue, setInputValue] = useState("");
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
    <FormGroup>
      {!noLabel && <Label>Tags</Label>}
      <div className="flex-col">
        <InputField
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
    </FormGroup>
  );
};

export default TagsInput;
