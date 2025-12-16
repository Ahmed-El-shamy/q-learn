import React from "react";
import ContactInput from "../../contact-us/_components/ContactInput";
import ContactTextarea from "../../contact-us/_components/ContactTextarea";
import MainBtn from "@/_components/common/buttons/MainBtn";

const BlogComment = () => {
  return (
    <>
      <h2 className="text-2xl md:text-3xl text-[#202e3b] font-semibold">
        Comments
      </h2>

      <div className="border border-[#d1d1d1] overflow-hidden flex flex-col h-full">
        <div className="px-8 py-15 md:p-15 flex flex-col gap-8 flex-1 justify-between">
          <h3 className="text-2xl md:text-3xl text-[#202e3b] font-semibold">
            Leave a comment
          </h3>
          <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <ContactInput label="Enter Full Name" />
              <ContactInput label="Enter Email Address" type="email" />
            </div>
            <ContactTextarea label="Write your comments here..." />
            <MainBtn
              title="Comment"
              type="submit"
              className="w-full"
              size={"large"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogComment;
