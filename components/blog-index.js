import { getPagesUnderRoute } from "nextra/context";
import { formatDate } from "../utils/util"
import Link from "next/link";
const MAX_POST_SIZE = 99;


export default function BlogIndex({ more = "Read more" }) {
  const routePages = getPagesUnderRoute("/post");
  // 按照时间排序
  routePages.sort(function (x, y) {
    const now = new Date();

    let xdate = x.frontMatter?.date || null;
    let ydate = y.frontMatter?.date || null;
    const a = (xdate == null) ? now : new Date(xdate)
    const b = (ydate == null) ? now : new Date(ydate)

    // console.log("a=>", a.getTime())
    // console.log("b=>", b.getTime())
    return b.getTime() - a.getTime();
  })

  return routePages.map((page, idx, arr) => {
    // console.log(page.route + "=>" + (page.frontMatter?.date || 0))

    if (idx >= MAX_POST_SIZE) {
      console.log("文章已到达上限=>" + MAX_POST_SIZE)
      return false;
    }

    // Alias `<a>` to avoid it being replaced by MDX components.
    const A = "a";
    return (
      <div className="">
        <h3>
          <Link href={page.route}>
            <A style={{ color: "inherit", textDecoration: "none" }}>
              {page.meta?.title || page.frontMatter?.title || page.name}
            </A>
          </Link>
        </h3>
        <p className="opacity-80">
          {page.frontMatter?.description}{" "}
          <Link href={page.route}>{more + " →"}</Link>
        </p>
        {page.frontMatter?.date ? (
          <p className="opacity-50 text-sm">{formatDate(page.frontMatter.date)}</p>
        ) : null}
      </div>
    );
  });
}
