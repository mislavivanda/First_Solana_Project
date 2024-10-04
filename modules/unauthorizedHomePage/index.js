import SupportIcon from "../../assets/supportIcon";
import { Button } from "../../components";
import { useRouter } from "next/router";
const UnauthorizedHomePage = () => {
  const router = useRouter();
  return (
    <>
      <section>
        <div className="mt-10">
          <h1 className="text-5xl font-extrabold">
            Welcome to <span className="text-primary-color">BoldMint</span>
          </h1>
          <p className="font-light mt-2 text-xl sm:text-3xl max-w-[65ch]">
            BoldMint is a cutting-edge platform that empowers{" "}
            <span className="font-bold">bold creators</span> to mint exclusive
            NFTs using the <span className="font-bold">Solana blockchain</span>.
            By leveraging Solana&apos;s{" "}
            <span className="font-bold">fast, low-cost transactions</span>,
            creators can easily tokenize their content, allowing fans to access
            their material through{" "}
            <span className="font-bold">SOL payments</span>.
          </p>
          <p className="font-light mt-2 text-xl sm:text-3xl max-w-[65ch]">
            With <span className="font-bold">minimal fees</span> and{" "}
            <span className="font-bold">seamless scalability</span>, BoldMint
            offers creators a new way to{" "}
            <span className="font-bold">monetize</span> without the overhead of
            traditional platforms, all while keeping{" "}
            <span className="font-bold">ownership</span> of their work and
            building <span className="font-bold">deeper connections</span> with
            their <span className="font-bold">audience</span>.
          </p>
        </div>
      </section>
      <section className="mt-[3.75rem]">
        <p className="font-light mt-2 text-xl sm:text-3xl max-w-[65ch]">
          BoldMint welcomes two key types of users:{" "}
          <span className="font-bold">content creators</span> and those who love
          to <span className="font-bold">explore and support</span> creative
          work.
        </p>
        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_auto_1fr] mt-5">
          <div>
            <h3 className="text-2xl sm:text-3xl">Content Creators</h3>
            <p className="font-light mt-2 text-lg sm:text-xl">
              Turn your ideas into exclusive NFTs on the Solana blockchain.
              Anyone can become a creator by filling out a simple form!
            </p>
            <Button
              classes="mt-2 !text-xl"
              type="filled"
              onClick={() => router.push("/register")}
            >
              Become Creator
            </Button>
          </div>
          <div className="bg-[#ccc] w-full h-[2px] sm:h-full sm:w-[2px] my-5 mx-0 sm:my-0 sm:mx-5" />
          <div>
            <h3 className="text-2xl sm:text-3xl">Supporters</h3>
            <p className="font-light mt-2 text-lg sm:text-xl">
              Discover and support your favorite creators by purchasing their
              NFTs for access to their content.
            </p>
            <Button
              classes="mt-2 !text-xl"
              type="filled"
              onClick={() => router.push("/register")}
            >
              Explore Content
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full mt-[3.75rem] py-5 text-center">
        <h1 className="text-5xl font-extrabold">Why use BoldMint?</h1>
        <div className="mt-5 flex flex-col sm:flex-row sm:justify-evenly items-center">
          <div className="w-[100px] p-2 sm:p-0 flex flex-col justify-center items-center">
            <svg
              className="w-[72px] h-[72px]"
              viewBox="0 0 72.000000 72.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,72.000000) scale(0.100000,-0.100000)"
                className="fill-primary-color"
                stroke="none"
              >
                <path
                  d="M90 372 c0 -187 3 -261 12 -270 9 -9 83 -12 270 -12 l258 0 0 30 0
30 -240 0 -240 0 0 240 0 240 -30 0 -30 0 0 -258z"
                />
                <path
                  d="M522 413 l-63 -56 -38 37 c-20 20 -41 36 -47 36 -5 0 -43 -34 -84
-75 -69 -70 -73 -76 -58 -92 16 -15 21 -12 83 42 l66 58 38 -37 c20 -20 41
-36 47 -36 5 0 43 33 83 74 64 64 73 77 61 90 -7 9 -15 16 -19 16 -3 0 -34
-26 -69 -57z"
                />
              </g>
            </svg>
            <h2 className="font-bold text-xl">Monetize Content</h2>
          </div>
          <div className="w-[100px] p-2 sm:p-0 flex flex-col justify-center items-center">
            <SupportIcon classes="w-[72px] h-[72px] fill-primary-color" />
            <h2 className="font-bold text-xl">Support Creators</h2>
          </div>
          <div className="w-[100px] p-2 sm:p-0 flex flex-col justify-center items-center">
            <svg
              className="w-[72px] h-[72px]"
              viewBox="0 0 600.000000 600.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
                className="fill-primary-color"
                stroke="none"
              >
                <path
                  d="M2980 5683 c-8 -3 -28 -11 -45 -19 -16 -7 -182 -74 -369 -148 -186
-75 -347 -143 -357 -152 -18 -16 -19 -41 -19 -476 0 -252 -3 -458 -7 -458 -7
0 -131 -101 -215 -176 l-28 -24 0 85 c0 76 -3 89 -22 108 -14 13 -183 87 -406
175 l-382 153 -68 -25 c-76 -29 -232 -91 -277 -110 -16 -8 -123 -50 -237 -95
-113 -45 -212 -89 -220 -98 -17 -21 -19 -956 -2 -973 6 -6 168 -74 360 -151
192 -78 355 -143 361 -146 10 -4 13 -44 13 -153 l0 -147 -87 -36 c-49 -20
-110 -45 -138 -55 -39 -15 -434 -174 -491 -198 -30 -13 -33 -59 -33 -481 0
-235 3 -446 7 -468 9 -48 4 -45 257 -146 99 -39 194 -77 210 -84 17 -8 100
-41 185 -75 l155 -61 45 17 c25 9 70 27 100 40 128 54 538 214 550 214 6 0 92
-66 190 -147 l179 -148 0 -286 c1 -262 3 -287 19 -302 10 -9 192 -86 405 -171
410 -164 392 -159 462 -126 11 5 135 55 275 110 140 56 273 109 295 119 22 10
57 24 77 30 20 7 48 21 62 32 l26 20 0 287 1 287 175 145 c97 80 182 146 190
148 7 2 166 -58 353 -132 l339 -135 54 18 c141 50 732 291 746 305 10 10 13
116 13 491 0 436 -1 481 -17 492 -9 6 -143 62 -298 124 -154 61 -314 125 -353
142 l-73 30 0 147 0 148 113 46 c61 25 224 91 361 145 137 55 253 104 259 110
11 11 12 955 1 973 -5 8 -127 68 -139 68 -7 0 -280 108 -330 130 -22 10 -94
39 -160 64 -66 26 -132 52 -146 57 -23 9 -69 -6 -345 -116 -456 -182 -481
-193 -488 -218 -3 -12 -6 -58 -6 -102 0 -44 -4 -75 -8 -70 -4 6 -60 55 -124
109 l-118 98 0 452 0 453 -22 19 c-13 11 -59 34 -103 51 -146 57 -529 210
-590 236 -76 31 -96 37 -115 30z m268 -222 c136 -54 267 -108 291 -118 l45
-19 -292 -117 -292 -117 -227 91 c-126 49 -246 98 -268 108 -22 10 -51 22 -65
26 -23 7 -21 9 30 32 30 14 89 38 130 53 41 16 147 58 235 94 88 36 161 66
163 66 2 0 114 -45 250 -99z m-616 -353 l308 -123 0 -382 c0 -211 -3 -383 -6
-383 -8 0 -131 48 -324 127 -74 30 -156 62 -182 71 -27 9 -48 18 -47 21 0 3
66 60 146 126 80 66 150 130 156 142 12 27 -11 68 -43 78 -26 8 -35 3 -197
-134 l-133 -111 0 345 c0 190 3 345 8 345 4 0 145 -55 314 -122z m1058 -223
l0 -346 -132 112 c-73 61 -143 118 -154 125 -43 29 -108 -23 -86 -70 5 -11 75
-75 155 -141 81 -66 147 -123 147 -126 0 -3 -21 -12 -47 -21 -27 -9 -149 -57
-273 -107 -123 -50 -228 -91 -232 -91 -4 0 -8 172 -8 383 l0 382 303 122 c166
67 308 122 315 122 9 1 12 -74 12 -344z m-2295 -370 c143 -57 274 -109 290
-115 29 -11 21 -15 -180 -96 -115 -47 -241 -97 -280 -111 -38 -14 -75 -29 -81
-34 -11 -9 -594 217 -594 230 1 6 558 230 575 231 5 0 127 -47 270 -105z
m3781 -12 c150 -59 274 -111 274 -114 0 -4 -123 -55 -272 -114 -150 -60 -278
-112 -284 -117 -11 -8 -68 12 -249 86 -44 19 -140 57 -212 86 -73 29 -133 55
-133 59 1 12 565 231 584 226 10 -2 142 -52 292 -112z m-2596 -274 c168 -67
323 -129 345 -139 68 -30 78 -30 140 -4 33 13 196 79 362 145 l301 120 166
-137 166 -137 0 -302 c0 -225 3 -305 12 -318 7 -10 137 -67 288 -127 151 -61
314 -127 363 -147 l87 -36 0 -148 0 -147 -137 -55 c-76 -30 -219 -87 -318
-127 -256 -102 -276 -111 -286 -138 -5 -13 -9 -231 -9 -485 l0 -462 -123 -101
-122 -101 -2 96 c-4 139 -2 135 -85 169 -120 50 -349 142 -413 167 -33 12
-117 46 -187 74 l-128 51 -127 -51 c-71 -28 -171 -68 -223 -89 -316 -124 -436
-175 -445 -189 -5 -9 -12 -64 -15 -122 l-5 -106 -122 101 -123 101 0 470 c0
409 -2 473 -16 493 -8 12 -20 22 -26 22 -5 0 -24 6 -41 14 -18 8 -113 47 -212
86 -99 40 -242 97 -317 127 l-138 55 0 147 0 147 88 36 c138 58 211 87 292
118 187 72 346 141 358 157 9 13 12 93 12 318 l0 302 163 136 c89 74 164 136
167 136 2 1 142 -54 310 -120z m2980 -316 l-1 -388 -297 -117 c-163 -65 -304
-120 -312 -123 -13 -5 -15 42 -15 378 l0 384 210 83 c116 46 228 92 250 101
32 14 152 64 163 68 1 1 2 -173 2 -386z m-4800 256 l305 -122 0 -383 c0 -337
-2 -384 -15 -379 -8 3 -149 58 -312 123 l-297 117 -1 383 c0 210 3 382 8 382
4 0 144 -54 312 -121z m1055 104 c-2 -10 -4 -183 -4 -385 -1 -266 -4 -368 -12
-368 -6 0 -37 -11 -68 -25 -65 -28 -386 -157 -478 -191 l-63 -24 0 384 c0 298
3 385 13 389 127 52 549 221 567 227 39 13 48 11 45 -7z m2681 -99 c159 -64
295 -118 302 -121 9 -4 12 -91 12 -389 l0 -384 -62 24 c-93 34 -414 163 -479
191 -31 14 -61 25 -68 25 -7 0 -11 113 -13 385 -2 284 0 385 8 385 7 0 142
-52 300 -116z m-3433 -1565 c-2 -105 -1 -112 22 -135 29 -29 45 -30 79 -3 25
20 26 23 26 134 l0 114 43 -15 c93 -33 467 -187 467 -193 -1 -3 -130 -57 -287
-120 l-287 -113 -277 111 c-153 61 -283 111 -288 111 -40 0 20 30 237 118 136
55 252 100 257 101 6 1 9 -41 8 -110z m3774 -139 c34 -26 49 -25 79 5 25 25
25 29 22 135 -2 61 -1 110 1 110 2 0 118 -46 257 -101 221 -88 284 -119 244
-119 -6 0 -90 -32 -188 -71 -97 -39 -223 -89 -278 -111 l-101 -40 -264 106
c-145 58 -277 110 -294 116 -29 11 -21 15 180 96 116 47 233 93 260 103 l50
18 3 -113 c3 -108 4 -114 29 -134z m-4217 -120 c85 -34 200 -80 255 -102 55
-22 119 -48 143 -57 l42 -17 3 -382 c1 -280 -1 -382 -9 -382 -7 0 -90 32 -185
70 -96 39 -231 94 -301 122 l-128 51 0 384 c0 304 3 384 13 380 6 -3 82 -33
167 -67z m1195 -290 c0 -198 -2 -360 -5 -360 -6 1 -24 14 -86 67 -59 49 -172
143 -196 162 -23 17 -74 -2 -84 -31 -12 -39 9 -65 136 -168 71 -58 129 -108
127 -113 -1 -4 -118 -54 -260 -111 l-257 -103 0 386 0 386 43 16 c23 9 87 35
142 57 301 120 431 171 435 172 3 0 5 -162 5 -360z m2535 298 c69 -27 150 -60
180 -72 30 -13 105 -43 167 -67 l112 -44 1 -386 0 -386 -256 103 c-141 56
-259 106 -263 109 -3 4 1 12 10 19 30 21 100 80 178 146 87 76 99 104 55 139
-15 11 -32 21 -38 21 -6 0 -76 -54 -156 -120 -80 -66 -147 -120 -150 -120 -3
0 -5 162 -5 360 0 355 0 360 20 354 11 -4 76 -29 145 -56z m1210 -322 l0 -383
-127 -51 c-71 -28 -206 -83 -302 -122 -95 -38 -178 -70 -185 -70 -8 0 -10 102
-9 381 l3 382 57 24 c32 13 92 37 133 53 41 16 152 60 245 99 94 38 173 70
178 70 4 1 7 -172 7 -383z m-2283 -336 c152 -61 282 -114 290 -119 10 -5 -83
-47 -277 -124 l-291 -117 -152 61 c-84 34 -214 86 -290 117 -75 30 -135 57
-133 60 4 4 565 230 574 232 2 0 127 -50 279 -110z m-337 -847 c0 -211 -3
-383 -7 -383 -5 0 -145 55 -313 123 l-305 122 -3 386 -2 386 315 -126 315
-126 0 -382z m742 -135 c-8 -8 -601 -248 -614 -248 -4 0 -8 172 -8 383 l0 382
313 125 312 125 3 -379 c1 -209 -1 -383 -6 -388z"
                />
                <path
                  d="M2425 3980 c-181 -38 -328 -170 -391 -352 -14 -38 -19 -82 -19 -158
1 -121 17 -188 67 -267 42 -66 468 -497 525 -530 25 -14 54 -44 72 -72 46 -76
456 -479 531 -523 151 -89 359 -89 516 -1 103 58 200 176 240 293 14 40 19 83
19 160 -1 125 -18 190 -74 277 -47 73 -447 476 -511 516 -26 16 -58 48 -75 75
-16 26 -128 146 -249 268 -240 240 -294 280 -416 308 -69 17 -170 19 -235 6z
m231 -130 c32 -11 76 -32 96 -45 20 -14 132 -120 249 -237 228 -230 256 -269
279 -385 30 -150 -46 -319 -179 -405 l-45 -28 -28 27 c-36 34 -56 92 -37 104
94 53 141 122 147 217 8 112 -4 130 -240 368 -237 240 -266 259 -368 258 -191
-2 -312 -198 -228 -369 11 -22 85 -106 165 -186 l145 -146 -11 -76 c-6 -42 -8
-83 -5 -92 3 -8 4 -15 1 -15 -13 0 -392 391 -412 425 -104 179 -50 419 119
534 101 69 240 89 352 51z m-86 -250 c25 -7 71 -45 160 -136 l125 -126 -25
-16 c-14 -9 -50 -41 -80 -72 -31 -30 -63 -66 -72 -80 l-16 -25 -126 125 c-92
91 -129 135 -136 160 -19 71 24 149 94 169 41 12 36 12 76 1z m441 -439 c9
-27 9 -36 0 -39 -35 -12 -98 -74 -123 -121 -35 -67 -38 -153 -7 -221 27 -60
404 -442 469 -475 129 -66 275 -21 345 106 24 44 29 66 29 119 0 96 -23 132
-190 300 l-145 146 11 73 c6 41 8 82 5 93 -4 10 -4 18 -1 18 14 0 390 -388
411 -424 86 -150 65 -347 -51 -476 -128 -141 -356 -171 -514 -66 -19 13 -131
119 -249 237 -230 231 -258 270 -281 386 -29 149 47 320 179 405 l45 28 28
-27 c15 -14 33 -42 39 -62z m457 -434 c134 -134 150 -162 131 -230 -13 -47
-49 -84 -98 -97 -67 -18 -96 -1 -231 136 l-125 126 25 16 c44 29 119 104 141
138 11 19 24 34 27 34 4 0 62 -55 130 -123z"
                />
              </g>
            </svg>

            <h2 className="font-bold text-xl">Web3 Participation</h2>
          </div>
        </div>
      </section>
      <section className="flex justify-center mt-10">
        <Button
          type="filled"
          classes="!text-2xl"
          onClick={() => router.push("/register")}
        >
          Get started
        </Button>
      </section>
    </>
  );
};

export default UnauthorizedHomePage;
