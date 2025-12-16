import { Link } from "@/i18n/navigation";
import { Facebook, Heart, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const BlogSocial = () => {
  return (
    <div className="space-y-5">
      <h3 className="text-2xl text-[#202e3b]">Share This Article</h3>
      <div className="flex-between">
        <ul className="flex flex-wrap gap-3">
          <li>
            <Link
              href={"social.link"}
              className="bg-white/20 shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
            >
              <Facebook size={20} fill="#395799" stroke="#395799" />
            </Link>
          </li>

          <li>
            <Link
              href={"social.link"}
              className="bg-white/20 shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
            >
              <Twitter size={20} fill="#03abf0" stroke="#03abf0" />
            </Link>
          </li>

          <li>
            <Link
              href={"social.link"}
              className="bg-white shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
            >
              <Instagram size={20} stroke="#b633ff" />
            </Link>
          </li>

          <li>
            <Link
              href={"social.link"}
              className="bg-white/20 shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
            >
              <Linkedin size={20} fill="#0477b5" stroke="#0477b5" />
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <p>0</p>
          <Heart size={30} fill="#0d6efd" stroke="#0d6efd" />
        </div>
      </div>
    </div>
  );
};

export default BlogSocial;
