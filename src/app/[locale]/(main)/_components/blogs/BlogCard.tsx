import MainBtn from "@/_components/common/buttons/MainBtn";
import { Link } from "@/i18n/navigation";
import { title } from "process";

interface BlogCardProps {
  id: string;
  course?: string;
  image?: string;
  avatar?: string;
  name?: string;
  date?: string;
  blogTitle?: string;
  blogContent?: string;
}

const BlogCard = ({
  id,
  course,
  image,
  avatar,
  name,
  date,
  blogTitle,
  blogContent,
}: BlogCardProps) => {
  return (
    <div
      className=" 
        w-[350px] sm:w-[420px] bg-white max-h-[550px] rounded-xl pb-5 relative text-[#38485c]"
    >
      <div className="relative h-[250px]">
        <div className="absolute right-3 top-3 py-2 px-3 text-xs font-semibold text-white bg-black/50 rounded-full">
          {course}
        </div>
        <Link href={`/blogs/${id}`}>
          <img
            src={image}
            alt="blog image"
            className="rounded-t-xl w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="p-2 w-[90%] rounded-full bg-[#cee8ff] absolute top-[43%] left-5 sm:left-3 md:left-5">
        <div className="flex-between">
          <div className="flex-center gap-2">
            <div className="w-8 h-8 rounded-full">
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p>{name}</p>
          </div>
          <div>
            <p>{date}</p>
          </div>
        </div>
      </div>

      <div className="text-left pt-10 pb-5 px-8">
        <h3 className="text-[#1f2b40] text-xl xl:text-2xl capitalize">
          {blogTitle}
        </h3>
        <p className="my-5 text-sm text-[#777e93] line-clamp-3">
          {blogContent}
        </p>
        <MainBtn title="read more" className="text-sm py-2! px-4!" />
      </div>
    </div>
  );
};

export default BlogCard;
