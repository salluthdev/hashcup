import { TrackedAddressContext } from "@/context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ModalTrackingAddress } from "../modal/header";
import { Button } from "../button";

export default function Header() {
  const [githubStars, setGithubStars] = useState(0);
  const [modal, setModal] = useState("");
  const { trackedAddress } = useContext(TrackedAddressContext);
  const router = useRouter();

  // Counting github repo stars
  useEffect(() => {
    fetch("https://api.github.com/repos/salluthdev/hashcup")
      .then((res) => res.json())
      .then((data) => setGithubStars(data.stargazers_count));
  }, []);

  const handleLogoClick = () => {
    if (router.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-full sticky top-0 flex justify-center bg-seashell z-20">
        <div className="w-full max-w-xl relative flex flex-wrap justify-between items-center gap-4 pt-8 pb-4 px-4">
          <div
            className="cursor-pointer scroll-smooth"
            onClick={handleLogoClick}
          >
            <Image
              src={"/img/hashcup-logo.png"}
              width={40}
              height={40}
              alt="hashcup logo"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={"https://github.com/salluthdev/hashcup"}
              target="_blank"
              className="flex items-center gap-1 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] py-2 px-3 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Image src={"/svg/icon-star.svg"} width={16} height={16} alt="" />
              <p className="font-medium text-brandeis_blue">{githubStars}</p>
            </Link>
            {trackedAddress ? (
              <Button
                size="sm"
                onClick={() => setModal("modal-tracking-address")}
              >
                Connect Wallet
              </Button>
            ) : (
              <ConnectButton showBalance={false} chainStatus={"none"} />
            )}
          </div>
          <div className="absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-t from-transparent via-transparent to-seashell blur" />
        </div>
      </div>
      {modal === "modal-tracking-address" ? (
        <ModalTrackingAddress
          setModal={setModal}
          trackedAddress={trackedAddress}
        />
      ) : null}
    </>
  );
}
