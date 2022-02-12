import { useRouter } from "next/router";
import { useAsync } from "react-use";

import { LoadingView } from "~/core/components/LoadingView";

export default function ChapterRedirect() {
  const router = useRouter();

  useAsync(async () => await router.push("/" + router.query.courseId), []);
  return <LoadingView />;
}
