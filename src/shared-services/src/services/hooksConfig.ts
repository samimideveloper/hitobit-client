/**
 * You can modify this file
 *
 * @version 5
 */
import { SwaggerResponse } from "./config";

type GetDataType<
  T extends Array<SwaggerResponse<any>>,
  K extends string = "data" | "list" | "notifications" | "apiKeys",
> = T extends Array<SwaggerResponse<infer D>>
  ? D extends {
      [P in K]?: infer R1;
    }
    ? R1
    : D extends Array<any>
    ? D
    : never
  : never;

const paginationFlattenData = <T extends Array<SwaggerResponse<any>>>(
  pages?: T,
): GetDataType<T> | undefined =>
  pages?.flatMap((page) =>
    Array.isArray(page)
      ? page
      : Array.isArray(page?.data)
      ? page.data
      : Array.isArray(page?.list)
      ? page.list
      : Array.isArray(page?.notifications)
      ? page.notifications
      : Array.isArray(page?.apiKeys)
      ? page.apiKeys
      : [],
  ) as any;

const getTotal = <T extends Array<SwaggerResponse<any>>>(
  pages?: T,
): number | undefined => {
  return (
    pages?.[(pages?.length || 0) - 1]?.total |
    pages?.[(pages?.length || 0) - 1]?.count |
    pages?.[(pages?.length || 0) - 1]?.totalCount
  );
};

const getPageSize = (queryParams?: any): number | undefined => {
  const pageSize = Object.entries(queryParams || {}).find(([key, _value]) => {
    if (
      key.toLowerCase() === "pagesize" ||
      key.toLowerCase() === "pagenumber" ||
      key.toLowerCase() === "pageno"
    ) {
      return true;
    }
    return false;
  });

  //@ts-ignore
  return (pageSize[1] || 10) as number;
};

export { paginationFlattenData, getTotal, getPageSize };
