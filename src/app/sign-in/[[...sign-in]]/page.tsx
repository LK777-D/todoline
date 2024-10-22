import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import authImg from "@/assets/authImg.png";
export default function LogIn() {
  return (
    <div className="flex justify-around items-center h-[100vh]">
      <Image src={authImg} alt="authimage" className="hidden lg:block" />
      <SignIn fallbackRedirectUrl={"/"} forceRedirectUrl={"/"} />
    </div>
  );
}
