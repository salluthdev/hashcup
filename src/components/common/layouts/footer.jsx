import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full flex flex-col gap-4 items-center bg-very_pale_orange py-10 px-4">
      <p>Connect with The Creator</p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 relative flex justify-center items-center bg-root_beer rounded-full  cursor-pointer">
          <Image
            src={"/svg/social/instagram.svg"}
            width={16}
            height={16}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
