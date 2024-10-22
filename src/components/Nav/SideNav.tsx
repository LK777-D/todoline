import star from "@/assets/phstar.svg";
import Image from "next/image";
import Link from "next/link";
import dashboard from "@/assets/dashboard.svg";
import sun from "@/assets/Vector.svg";
const SideNav = () => {
  return (
    <aside className="font-inter sticky top-0 h-[100vh]  hidden z-50  lg:block lg:w-[290px] border-r border-r-[#C7CAD0] ">
      <div className="px-5 pt-12">
        <Link
          href={"/"}
          className="flex gap-1 rounded-[4px] text-[14px] transition duration-200 hover:bg-[#E7E8EA] p-3"
        >
          <Image src={sun} alt="sun" />
          My Day
        </Link>
        <Link
          href={"/important"}
          className="flex gap-1 text-[14px] rounded-[4px] transition duration-200 hover:bg-[#E7E8EA] p-3"
        >
          <Image src={star} alt="star" />
          Important
        </Link>
        <Link
          href={"/chart"}
          className="flex gap-1 text-[14px] rounded-[4px] transition duration-200 hover:bg-[#E7E8EA] p-3"
        >
          <Image src={dashboard} width={20} alt="star" />
          Chart
        </Link>
      </div>
    </aside>
  );
};

export default SideNav;
