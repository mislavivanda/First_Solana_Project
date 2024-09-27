import { Button } from "../../components";
import { useRouter } from "next/router";

const BecomeCreatorButton = ({ onClickCallback }) => {
  const router = useRouter();
  return (
    <div className="w-full mx-auto mb-2 flex items-center justify-center">
      <Button
        onClick={() => {
          router.push("/becomecreator");
          onClickCallback && onClickCallback();
        }}
        type="filled"
        classes="!text-xl"
      >
        Become creator
      </Button>
    </div>
  );
};

export default BecomeCreatorButton;
