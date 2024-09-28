import { parseBlogDate } from "../../helpers";
import { H2 } from "./heading.js";
import { P } from "./text.js";
import { Ul, Li } from "./list.js";
import { Quote } from "./quote.js";
import { ResponsiveImage } from "./image.js";
import dynamic from "next/dynamic";
//*PREVENT HYDRATION ERROR
const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
});

const customComponents = {
  h2: H2(""),
  p: P(""),
  ul: Ul(""),
  li: Li(""),
  blockquote: Quote(""),
  img: ResponsiveImage,
};

const PostCard = ({ blogData }) => {
  return (
    <article className="flex flex-col h-[300px] bg-white rounded-lg p-2 shadow-md overflow-hidden line-clamp-3 text-ellipsis">
      <div className="text-primary-color capitalize text-xl font-semibold border-b-2 border-solid border-primary-color pb-2">
        WallStreet rise
      </div>
      <div className="text-lg flex-grow my-2 overflow-y-auto">
        <ReactMarkdown
          components={customComponents}
          //eslint-disable-next-line react/no-children-prop
          children={`Ciro Immobile has made history and became S.S. Lazio’s undisputed best scorer with his 160th goal scored in the UEFA Europa League match against Marseille, on the 4th November, 2021—surpassing previous record holder and football legend, Silvio Piola.

To celebrate this new milestone achieved by the Italian striker, fans of the club who held the LAZIO Fan Token had the chance to cast their votes on “the Best Goal Scored by Ciro Immobile” in a Fan Voting Poll on the Binance Fan Token Platform. Immobile chose six of his favourite goals to kick off this session, and LAZIO Fan Token holders could re-watch and enjoy each moment on the Platform before casting their votes.

# What’s Next for Fans of S.S. Lazio and Immobile?

Binance and S.S. Lazio has partnered up with [NFKings](http://www.nfkings.io/) to bring Ciro Immobile’s selection of his top 6 goal moments into the NFT world—and to the Binance Fan Token sports community.

The new, limited edition ‘S.S. Lazio x Immobile Best 6 NFT Collection’ is launching on 2022-01-11, via the Binance NFT Marketplace, to immortalize the striker’s best goal moments on the blockchain.

Each user can purchase up to 10 Mystery Boxes at a starting price of 17.17 $LAZIO and collect NFTs in 4 different rarity levels: Normal (N), Rare (R), Super Rare (SR) and Super Super Rare (SSR). There are only 7,171 Limited Edition NFTs on sale in celebration of player #17, so make sure to get yours before they are gone!

![](https://images.ctfassets.net/rzumas0pbxcl/2fLi3sBeNPyZFafbHh9pzR/e89c91c6fb45483f189baca2608d12a0/blog3bimage.jpg)

Participating in the NFT drop is only one way fans can engage with the team and Immobile. For those who want to take their fandom to the next level, S.S. Lazio is preparing giveaways in LAZIO Fan Token and some exclusive rewards, only accessible for the most persistent of fans! Read on to find out what these are.

## 1. NFT Drop: Win a Meet-and-Greet with the Legend, Ciro Immobile

Collect at least one ‘S.S. Lazio x Immobile Best 6 NFT’ and share a screenshot of it on Twitter alongside a creative tweet and the @BinanceFanToken handle to stand a chance to receive an invitation to a meet-and-greet and exclusive autograph session with S.S. Lazio key players, including the one and only Ciro Immobile. Binance will choose 15 winners, based on the originality of their tweets.

## 2. PowerStation: Win 15,000 LAZIO Fan Tokens and a Signed Jersey

Join the NFT PowerStation from 2022-01-12 and charge ‘S.S. Lazio x Immobile Best 6 NFTs’ to get your fair share from the 15,000 LAZIO Fan Token reward pool on an hourly basis, according to your Fan Power. Users who participate in the NFT PowerStation for a minimum of 7 days will also stand a chance to win a S.S. Lazio official jersey, signed by Immobile. A total of 20 winners will be selected based on Binance Chain Hash Value.

Don’t forget that warm-up for the PowerStation begins on the 2022-01-11 and to participate, users must have a KYC verified Binance.com account as well as a minimum balance of 0.1 BNB.

`}
        />
      </div>
      <div className="border-t-2 border-solid border-primary-color text-right font-semibold pt-2">
        {parseBlogDate(new Date())}
      </div>
    </article>
  );
};

export default PostCard;
