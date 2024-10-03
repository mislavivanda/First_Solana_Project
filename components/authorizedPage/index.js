import { useSession } from "next-auth/react";
import Spinner from "../spinner";
const AuthorizedPage = ({
  children,
  roleCheckMethod,
  unauthorizedFallbackComponent,
  renderChildrenMethod,
}) => {
  console.log("AuthorizedPage");
  const { data: sessionData, status } = useSession();
  console.log(sessionData, status);
  if (status === "loading")
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center">
        <Spinner classes="w-[3rem] h-[3rem] border-primary-color" />
      </div>
    );

  if (status === "authenticated") {
    console.log("Return children");
    console.log("Session data 2", sessionData);
    if (roleCheckMethod) {
      if (roleCheckMethod(sessionData)) {
        return (
          <>
            {renderChildrenMethod
              ? renderChildrenMethod(sessionData)
              : children}
          </>
        );
      } else
        return (
          <div className="w-full h-full flex-grow flex items-center justify-center font-bold">
            Unauthorized.
          </div>
        );
    } else
      return (
        <>
          {renderChildrenMethod ? renderChildrenMethod(sessionData) : children}
        </>
      );
  }

  if (status === "unauthenticated")
    return (
      unauthorizedFallbackComponent || (
        <div className="w-full h-full flex-grow flex items-center justify-center font-bold">
          Unauthorized. Please sign in.
        </div>
      )
    );
};

export default AuthorizedPage;
