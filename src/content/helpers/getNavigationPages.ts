import CourseIndex from "~/core/models/CourseIndex";

export default function getNavigationPages(slug: string, pages: string[], index: CourseIndex) {
  const currentPageIndex = pages.indexOf(slug) ?? -1;
  const nextPage =
    currentPageIndex >= pages.length - 1
      ? null
      : {
          slug: pages[currentPageIndex + 1],
          title: Object.entries(index[pages[currentPageIndex + 1].split("/")[0]].content).find(
            ([slug]) => slug === pages[currentPageIndex + 1].split("/")[1]
          )[1].name,
        };
  const prevPage =
    currentPageIndex <= 0
      ? null
      : {
          slug: pages[currentPageIndex - 1],
          title: Object.entries(index[pages[currentPageIndex - 1].split("/")[0]].content).find(
            ([slug]) => slug === pages[currentPageIndex - 1].split("/")[1]
          )[1].name,
        };

  return { nextPage, prevPage };
}
