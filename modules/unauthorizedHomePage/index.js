import { Button } from "../../components";
const UnauthorizedHomePage = () => {
  return (
    <div>
      <section className="flex flex-wrap items-center justify-evenly w-full ">
        <div className="w-full max-w-lg sm:w-auto mt-10">
          <Button type="filled" classes="mt-[0.5rem]">
            Get started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default UnauthorizedHomePage;
