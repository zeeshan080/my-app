import Hero from "@/components/Hero";
import Product from "@/components/Products";
import { allProduct, bannerData } from "@/lib/db";
import { Allproduct, bannerType } from "@/lib/type";


const banner:bannerType[]= bannerData
const product:Allproduct[]= allProduct

export default function Home() {
  return (
   <div>
    <Hero bannerdata={banner}/>
    <Product products={product}/>
   </div>
  );
}
