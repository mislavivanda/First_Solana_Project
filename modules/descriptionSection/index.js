const DescriptionSection = ({ containerClasses }) => {
  return (
    <section className={containerClasses}>
      <p className="font-light mt-2 text-xl sm:text-3xl max-w-[65ch]">
        BoldMint is a cutting-edge platform that empowers{" "}
        <span className="font-bold">bold creators</span> to mint exclusive NFTs
        using the <span className="font-bold">Solana blockchain</span>. By
        leveraging Solana&apos;s{" "}
        <span className="font-bold">fast, low-cost transactions</span>, creators
        can easily tokenize their content, allowing fans to access their
        material through <span className="font-bold">SOL payments</span>.
      </p>
      <p className="font-light mt-2 text-xl sm:text-3xl max-w-[65ch]">
        With <span className="font-bold">minimal fees</span> and{" "}
        <span className="font-bold">seamless scalability</span>, BoldMint offers
        creators a new way to <span className="font-bold">monetize</span>{" "}
        without the overhead of traditional platforms, all while keeping{" "}
        <span className="font-bold">ownership</span> of their work and building{" "}
        <span className="font-bold">deeper connections</span> with their{" "}
        <span className="font-bold">audience</span>.
      </p>
    </section>
  );
};

export default DescriptionSection;
