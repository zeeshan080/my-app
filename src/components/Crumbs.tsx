import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Props ={
    link:string,
    text:string
}

export default function CustomerCrumbs ({link,text}:Props) {
  return (
    <Breadcrumb >
      <BreadcrumbList>
        <BreadcrumbItem>
            <Link href={link}>{text}</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  )
}
