import React from "react";
import { useSession } from "next-auth/react";

const Account = () => {
  const { data: session } = useSession();
  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 459 459"
              style={{ width: "3.75rem", height: "3.75rem" }}
              className="mr-2"
            >
              <g fill="#642dfd">
                <path
                  d="M229.5,0C102.53,0,0,102.845,0,229.5C0,356.301,102.719,459,229.5,459C356.851,459,459,355.815,459,229.5
                  C459,102.547,356.079,0,229.5,0z M347.601,364.67C314.887,393.338,273.4,409,229.5,409c-43.892,0-85.372-15.657-118.083-44.314
                  c-4.425-3.876-6.425-9.834-5.245-15.597c11.3-55.195,46.457-98.725,91.209-113.047C174.028,222.218,158,193.817,158,161
                  c0-46.392,32.012-84,71.5-84c39.488,0,71.5,37.608,71.5,84c0,32.812-16.023,61.209-39.369,75.035
                  c44.751,14.319,79.909,57.848,91.213,113.038C354.023,354.828,352.019,360.798,347.601,364.67z"
                />
              </g>
            </svg>
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-bold text-font-color">
                {session.userData.name + " " + session.userData.surname}
              </h3>
              <h4 className="text-md font-bold text-font-color-light">
                {session.userData.email}
              </h4>
            </div>
          </div>
          <div />
        </div>
      </section>
    </>
  );
};

Account.needsAuthentication = true;

export default Account;
