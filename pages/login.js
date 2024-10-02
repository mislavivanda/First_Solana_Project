import { Button, FormGroup, InputField, Label, Spinner } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const [runFormAnimation, setRunFormAnimation] = useState(false); //za pokretanje animacije svaki put kad se ude na login
  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        //AKO IMA SESIJU REDIRECTAJ GA NA HOME PAGE
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  //componenet did mount ali nakon svakog rendera(ukljucjuci i prvi)
  useEffect(() => {
    //trigeraj animaciju nakon sta se postavi setLoading na false
    if (!loading && !runFormAnimation) {
      setTimeout(() => {
        setRunFormAnimation(true);
      }, 100);
    }
  });

  //napravi za github isto login funkcije koje ce pozivat signin('github') i signin('goggle'), proslijedi string u onlogin funkciju da znamo razlikovat tip
  const onCredentialsLogin = async (e) => {
    e.preventDefault();

    const enteredEmail = document.getElementById("user-email").value.toString();
    const enteredPassword = document
      .getElementById("user-password")
      .value.toString();
    if (enteredEmail && enteredPassword) {
      setLoginLoading(true);

      signIn("credentials", {
        //on ce po defaultu redirectat di treba
        email: enteredEmail,
        password: enteredPassword,
      });
    }
  };

  const onGithubLogin = async (e) => {
    e.preventDefault();
    signIn("github");
  };

  const onGoogleLogin = async (e) => {
    e.preventDefault();

    signIn("google");
  };

  if (!loading) {
    return (
      <>
        <div className="relative">
          <h1
            className={`absolute -left-[200vw] -top-16 md:top-0 transition-transform duration-500 ease-in-out ${
              runFormAnimation ? "translate-x-[200vw]" : ""
            }  inline text-5xl font-extrabold mx-5 sm:mx-10 text-left border-b-primary-color border-b-[5px] border-solid`}
          >
            Login
          </h1>
        </div>
        {/*dodan height da na mobitelima footer bude uvijek ispod login dijela */}
        <section className="relative flex items-center justify-center h-[32rem]">
          <div
            className={`w-full max-w-xs shadow-xl absolute mx-auto -right-[calc(200vw-50%)] transition-transform duration-1000 ease-in-out ${
              runFormAnimation ? "-translate-x-[calc(200vw-50%)]" : ""
            }`}
          >
            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
              <FormGroup>
                <Label forName="e-mail">E-mail</Label>
                <InputField id="user-email" type="text" placeholder="E-mail" />
              </FormGroup>
              <div className="mb-6">
                <Label forName="password">Password</Label>
                <InputField
                  id="user-password"
                  type="password"
                  placeholder="*************"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="filled"
                  onClick={onCredentialsLogin}
                  classes="relative"
                >
                  <span className={`${loginLoading ? "invisible" : ""}`}>
                    Log in
                  </span>{" "}
                  {/* 0.5625 dobijemo kao 1rem(polovica visine botuna koji s padding i line height ima 2 rem ukupno) - polovica od visine spinnera jer na taj način centiramo apsolutne elemente po y osi */}
                  {loginLoading && (
                    <Spinner
                      width={"0.875rem"}
                      height={"0.875rem"}
                      color="#ffffff"
                      classes="absolute top-[0.5625rem] left-[calc(50%-0.4375rem)]"
                    />
                  )}
                </Button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mt-6">
                Don&apos;t have an account?
                <div>
                  <Link href="/register">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                      Register now!
                    </a>
                  </Link>
                </div>
              </div>
              <h2 className="text-xl text-font-color-dark font-bold text-center">
                OR
              </h2>
              <div className="mt-5 flex flex-col">
                <Button
                  onClick={onGithubLogin}
                  color="bg-black"
                  classes="w-full flex items-center justify-center rounded-sm border-2 border-font-color-dark border-solid"
                >
                  <span className="text-lg mr-2 text-white">
                    Sign In With Github
                  </span>
                  <svg
                    viewBox="0 -3.5 256 256"
                    style={{ width: "1.8rem", height: "1.8rem" }}
                  >
                    <g fill="#ffffff">
                      <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
                      <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
                    </g>
                  </svg>
                </Button>
                <Button
                  onClick={onGoogleLogin}
                  color="bg-white"
                  classes="mt-5 w-full flex items-center justify-center rounded-sm border-2 border-font-color-dark border-solid"
                >
                  <span className="text-lg mr-2">Sign In With Google</span>
                  <svg
                    viewBox="-3 0 262 262"
                    style={{ width: "1.875rem", height: "1.875rem" }}
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  } else return null;
};

export default Login;
