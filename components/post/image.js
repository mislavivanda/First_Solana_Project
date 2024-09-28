/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import loader from "../../utils/remoteImageLoader.js";

export const ResponsiveImage = (props) => {
  return (
    <div className="flex flex-col items-center my-4">
      <div className="relative mx-auto w-full sm:w-4/5 h-60 sm:h-80">
        <Image
          loader={loader}
          layout="fill"
          objectFit={"contain"}
          objectPosition={"center center"}
          {...props}
        />
      </div>
      {props.alt && <p className="mt-2 text-">{props.alt}</p>}
    </div>
  );
};
