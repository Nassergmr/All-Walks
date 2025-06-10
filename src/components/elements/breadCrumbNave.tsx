import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbNavProps {
  items: { label: string | React.ReactNode; href?: string }[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem key={index}>
              {item.href ? (
                <Link className="hover:text-black" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className="font-black lg:text-2xl md:text-xl text-lg text-black">
                  {item.label}
                </span>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
