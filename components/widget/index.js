const Widget = ({ value, description, icon }) => {
  return (
    <article
      className={`w-72 p-5 mx-2 flex flex-col items-center justify-evenly flex-nowrap flex-shrink-0 rounded-[1rem] shadow-xl  border-solid border-primary-color border-4`}
    >
      <div>{icon}</div>
      <div className="mt-4 p-2 text-center">
        <p className="m-0 text-4xl font-bold">{value}</p>
        <p className="m-0 text-2xl">{description}</p>
      </div>
    </article>
  );
};

export default Widget;
