import { Button } from "../components";
import TagsInput from "../modules/tagsInput";

const BecomeCreator = () => {
  return (
    <div className="max-w-[400px] rounded-[0.5rem] pt-2 pb-2 pl-4 pr-4 ml-auto mr-auto">
      <div className="mb-4">
        <label className="mb-1 inline-block font-semibold">About you</label>
        <textarea
          className="mt-4 p-2 focus:border-primary-color border-[1px] border-solid transition-colors rounded-md"
          placeholder="Short text about you and your interests"
          cols="30"
          rows="5"
        />
      </div>
      <TagsInput />
      <div className="mb-4">
        <label className="mb-1 inline-block font-semibold">
          Wallet address
        </label>
        {/*TODO -> CONNECT WALLET ILI DIREKTNI UNOS */}
        {/*TODO -> PREBCI OVAJ STIL U InputField */}
        <input className="block outline-none w-full pt-2 pb-2 pl-3 pr-3 focus:border-primary-color border-[2px] border-solid transition-colors rounded-md" />
      </div>
      {/*TODO -> MOZE ODABRAT PARAMETRE SVOJE NFT KOLEKCIJE? */}
      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" />
        <span>
          I agree to the <span className="underline">terms&conditions</span>.
        </span>
      </div>
      <div className="flex justify-center">
        <Button type="filled">Submit</Button>
      </div>
    </div>
  );
};

export default BecomeCreator;