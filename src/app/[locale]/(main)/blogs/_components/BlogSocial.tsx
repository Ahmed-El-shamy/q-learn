"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

const BlogSocial = () => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <div className="space-y-5">
      <h3 className="text-2xl text-[#202e3b]">Share This Article</h3>
      <div className="flex-between">
        <ul className="flex flex-wrap gap-3">
          <li>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              className="bg-white/20 shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} fill="#395799" stroke="#395799" />
            </a>
          </li>

          <li>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
              className="bg-white/20 shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} fill="#03abf0" stroke="#03abf0" />
            </a>
          </li>

          <li>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              className="bg-white/20 shadow-sm w-12 h-12 rounded-full inline-flex items-center justify-center duration-500 hover:bg-[#1f2b40]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} fill="#0477b5" stroke="#0477b5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogSocial;
