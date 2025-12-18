"use client";
import { ShieldUser, ShoppingCart, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import React from "react";
import { useCart } from "@/store/CartProvider";

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  alt?: string;
  level: string;
  details: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  students?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  image,
  alt,
  level,
  details,
  price,
  oldPrice,
  rating,
  students,
}) => {
  const { addToCart } = useCart();
  return (
    <div className="border border-gray-400 h-[500px] group overflow-hidden">
      <Link href={`/courses/${id}`}>
        <div className="w-full h-[45%] relative overflow-hidden">
          <p className="bg-purple-900/50 text-white py-3 px-5 absolute top-5 left-5 z-10">
            {level}
          </p>
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="data">
          <Link href={`/courses/${id}`}>
            <h3 className="text-primary font-semibold text-xl transition-colors ease-linear duration-500 hover:text-black">
              {title}
            </h3>
          </Link>

          <div className="flex items-center justify-between my-8">
            <div className="flex items-center gap-1">
              <Star size={18} fill="yellow" stroke="yellow" />
              <span className="text-gray-800 text-sm">
                {" "}
                0 ({rating} Rating)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldUser size={18} />
              <span className="text-gray-800 text-sm">{students} Students</span>
            </div>
          </div>

          <p className="line-clamp-2 text-[15px] text-gray-600">{details}</p>
        </div>

        <div className="flex justify-between items-center border-t border-t-gray-400 mt-8 py-4">
          <div className="flex items-center justify-center gap-1">
            <h4 className="text-primary font-bold text-2xl">${price}</h4>
            <p className="text-sm line-through">${oldPrice}</p>
          </div>
          <ShoppingCart
            onClick={() =>
              addToCart({
                id,
                course_id: id,
                title,
                image,
                price,
                sale_price: oldPrice,
                has_discount: !!oldPrice,
              })
            }
            fill="text-primary"
            size={25}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

// Course Details Page

{
  /*
    import React from "react";
    
    interface CourseDetailsProps {
      params: {
        locale: string;
        id: string;
      };
    }
    
    const Page = async ({ params }: CourseDetailsProps) => {
      const resolvedParams = await (params as any);
    
      const { id } = resolvedParams;
    
      return (
        <div className="p-10">
          <h1 className="text-xl font-bold">Course Details</h1>
          <p>Course ID: {id}</p>
        </div>
      );
    };
    
    export default Page;
    */
}
