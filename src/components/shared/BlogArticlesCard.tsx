import CustomImage from "@/components/shared/CustomImage";
import Link from "next/link";

type BlogArticlesCardProps = {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  href?: string;
};

const BlogArticlesCard = ({
  title,
  excerpt,
  image,
  date,
  readTime,
  href = "#",
}: BlogArticlesCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg  border-slate-200 bg-white shadow-sm">
      <div className="relative  w-full aspect-5/3">
        <CustomImage
          src={image}
          alt={title}
       width={392}
       height={172}
          className="object-cover w-full aspect-5/3"

        />
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400">
  
          <span className="text-sm text-[#838383]">{date}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-sm text-[#838383]">{readTime}</span>
        </div>
        <h3 className="text-lg leading-[120%] font-semibold text-[#191D23] whitespace-pre-line">{title}</h3>
        <p className="text-sm text-[#838383] leading-[120%] font-normal line-clamp-3 whitespace-pre-line">{excerpt}</p>
        <Link
          href={href}
          className="text-base leading-[120%] font-semibold text-primary hover:text-primary/90"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogArticlesCard;
