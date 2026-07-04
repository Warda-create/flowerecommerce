import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getReviewsByProductId } from "@/data/reviews";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewSection from "@/components/product/ReviewSection";
import RelatedProducts from "@/components/product/RelatedProducts";
import DeliveryInfo from "@/components/product/DeliveryInfo";
import CareInstructions from "@/components/product/CareInstructions";
import Breadcrumb from "@/components/common/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Flora & Grace`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const reviews = getReviewsByProductId(product.id);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: product.category, href: `/shop?category=${product.categorySlug}` },
          { label: product.name },
        ]}
        className="mb-8"
      />

      {/* Product main section */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Details grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <DeliveryInfo product={product} />
        <CareInstructions product={product} />
      </div>

      {/* Full description */}
      <div className="bg-cream-50 rounded-3xl p-8 mb-16">
        <h2 className="font-display text-xl font-semibold text-sage-900 mb-4">
          About This Arrangement
        </h2>
        <p className="font-body text-sage-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Reviews */}
      <div className="mb-16">
        <ReviewSection
          reviews={reviews}
          productRating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Related products */}
      {related.length > 0 && <RelatedProducts products={related} />}
    </div>
  );
}