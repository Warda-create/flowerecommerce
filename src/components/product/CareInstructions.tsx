import { Leaf, Droplets, Sun, Wind } from "lucide-react";
import { Product } from "@/types";

interface CareInstructionsProps {
  product: Product;
}

const icons = [Droplets, Sun, Wind, Leaf, Leaf, Droplets];

export default function CareInstructions({ product }: CareInstructionsProps) {
  return (
    <div className="bg-sage-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="w-5 h-5 text-sage-600" />
        <h3 className="font-display text-base font-semibold text-sage-800">
          Care Instructions
        </h3>
      </div>

      <p className="font-body text-xs text-sage-500 mb-4">
        Follow these steps to keep your flowers fresh and beautiful for as long as possible.
      </p>

      <ol className="space-y-3">
        {product.careInstructions.map((instruction, index) => {
          const Icon = icons[index % icons.length];
          return (
            <li key={index} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Icon className="w-3.5 h-3.5 text-sage-500" />
              </div>
              <p className="font-body text-sm text-sage-700 leading-relaxed">
                {instruction}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}