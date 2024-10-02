import { Button, FormGroup, InputField, Label } from "../components";
import { useState, useEffect } from "react";
import Link from "next/link";

const Register = () => {
  const onRegister = (e) => {
    e.preventDefault();
  };

  const [mounted, setMounted] = useState(false); //za pokretanje animacije svaki put kad se ude na login

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="relative">
        <div
          className={`absolute -left-[200vw] -top-16 lg:top-0 transition-transform duration-500 ease-in-out ${
            mounted ? "translate-x-[200vw]" : ""
          }`}
        >
          <h1 className="inline text-5xl font-extrabold  mx-5 sm:mx-10 text-left border-b-primary-color border-b-[5px] border-solid">
            Register
          </h1>
          <h3 className="mt-8 text-xl mx-5 sm:mx-10 max-w-[280px] text-left">
            Join BoldMint to turn your creativity into NFTs, support your
            favorite creators, and experience the future of content ownership!{" "}
          </h3>
        </div>
      </div>
      {/*dodan height da na mobitelima footer bude uvijek ispod register dijela */}
      <section className="relative mt-[7rem] flex items-center justify-center h-[25rem]">
        <div //isto kao kod logina samo uvecaj za velicinu h3 paragrafa -> fiksna, uvik 4 linije -> 4*lineheight = 7rem
          className={`w-full max-w-xs shadow-xl absolute mx-auto top-4 lg:top-0 -right-[calc(200vw-50%)] transition-transform duration-1000 ease-in-out ${
            mounted ? "-translate-x-[calc(200vw-50%)]" : ""
          }`}
        >
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <FormGroup>
              <Label forName="username">Name</Label>
              <InputField id="username" type="text" placeholder="Name" />
            </FormGroup>
            <div className="mb-6">
              <Label forName="email">E-mail</Label>
              <InputField id="email" type="text" placeholder="E-mail" />
            </div>
            <div className="mb-8">
              <Label forName="password">Password</Label>
              <InputField
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button type="filled" onClick={onRegister}>
                Register
              </Button>
              <Link href="/login">
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Have an account?
                </a>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
