import SupportIcon from "../../assets/supportIcon";
import { Avatar, Button } from "../../components";
import { capitalizeFirstLetter } from "../../helpers";

const AboutCreator = ({ creatorId }) => {
  const creatorData = {
    name: "John",
    surname: "Doe",
    supporters: 10,
    tags: ["Finance", "Investments", "Stock", "Wall Street"],
    about:
      "Hi, I'm John Doe, currently working as a hedge fund manager and in my free time like to write various analysis about market conditions and predictions. Hope you'll enjoy them",
    supportersCount: 16,
  };

  const handleSupportButtonClick = (solPrice) => {
    console.log("handleSupportButtonClick", solPrice);
  };

  return (
    <section className="mt-4 sm:mt-16">
      <article className="sm:flex max-w-screen-lg mx-auto">
        <div className="sm:mr-5 flex flex-col">
          <Avatar
            firstLetter={`${capitalizeFirstLetter(
              creatorData.name.charAt(0)
            )}${capitalizeFirstLetter(creatorData.surname.charAt(0))}`}
            containerClasses="flex justify-center sm:block"
            circleClasses="!w-[100px] !h-[100px] !text-[40px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-font-color-dark font-bold text-center sm:text-left mt-2 sm:mt-0">
            {`${creatorData.name} ${creatorData.surname}`}
          </h1>
          <p className="text-lg text-font-color mt-2">{creatorData.about}</p>
          <div className="flex flex-wrap">
            {creatorData.tags.map((tag, index) => (
              <div
                key={index}
                className={`flex items-center text-primary-color border-primary-color border-2 border-solid rounded-md pl-2 pr-2 m-2`}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <span className="text-[25px] mr-1">Supporters: </span>
            <span className="text-[25px] mr-1 font-semibold">
              {creatorData.supportersCount}
            </span>
            <SupportIcon classes="w-[30px] h-[30px] fill-font-color-dark" />
          </div>
          <div className="text-center">
            <Button
              onClick={() => handleSupportButtonClick(1.3)}
              type="filled"
              classes="mt-5 text-xl"
            >
              {`Support for 1.3SOL`}
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AboutCreator;
