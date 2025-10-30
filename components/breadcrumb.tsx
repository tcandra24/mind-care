"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";
import { ucwords } from "@/lib/utils";

const AppBreadcrumb = () => {
  const pathname = usePathname();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const arrayPaths = pathname.split("/");
    setPaths(arrayPaths.filter(Boolean));
  }, [pathname]);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href={"/dashboard"}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths &&
          paths.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{ucwords(path)}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
