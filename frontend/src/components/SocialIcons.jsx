import React from "react";
import { RiYoutubeFill, RiInstagramFill, RiTwitterXFill, RiFacebookFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4">
      <Link
        to={""}
        className="text-[#bd3d3d] text-2xl hover:-translate-y-1 transition-all duration-500">
        <RiYoutubeFill />
      </Link>
      <Link
        to={""}
        className="text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration-500">
        <RiInstagramFill />
      </Link>
      <Link
        to={""}
        className="text-[#f5f2f3] text-2xl hover:-translate-y-1 transition-all duration-500">
        <RiTwitterXFill />
      </Link>
      <Link
        to={""}
        className="text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-500">
        <RiFacebookFill />
      </Link>
    </div>
  );
};

export default SocialIcons;
