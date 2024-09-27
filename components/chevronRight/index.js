const ChevronRight = ({ stroke = null, classes }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke ? stroke : "#642dfd"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${classes}`}
      style={{ width: "1.5rem", height: "1.5rem" }}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export default ChevronRight;
