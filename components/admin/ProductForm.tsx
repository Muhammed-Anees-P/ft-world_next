"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/services/bannerService";
import { ICategory } from "@/types/ICategory";

/* ─────────────────────────── Types ─────────────────────────── */

interface ProductVariant {
  sku: string;
  color: string;
  storage: string;
  price: string;
  originalPrice: string;
  stock: string;
  images: string[];
}

interface ProductAttribute {
  name: string;
  values: string[];
}

interface RatingBreakdown {
  performance: number;
  buildQuality: number;
  valueForMoney: number;
}

interface FormState {
  name: string;
  slug: string;
  description: string;
  category: string;
  discountPrice: string;
  originalPrice: string;
  stock: string;
  warranty: string;
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
  isFeatured: boolean;
  isSuggestedForHome: boolean;
  isOffer: boolean;
  offerDescription: string;
  images: string[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  specifications: Record<string, string>;
  ratingBreakdown: RatingBreakdown;
}

interface Props {
  initialData?: any;
  categories: ICategory[];
  onSubmit: (data: any) => Promise<void>;
}

/* ─────────────────────────── Helpers ─────────────────────────── */

const emptyVariant = (): ProductVariant => ({
  sku: "",
  color: "",
  storage: "",
  price: "",
  originalPrice: "",
  stock: "",
  images: [],
});

/* ─────────────────────────── Component ─────────────────────────── */

export default function ProductForm({ initialData, categories, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    category: initialData?.category?._id || "",
    discountPrice: initialData?.discountPrice?.toString() || "",
    originalPrice: initialData?.originalPrice?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    warranty: initialData?.warranty || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    isActive: initialData?.isActive ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    isSuggestedForHome: initialData?.isSuggestedForHome ?? false,
    isOffer: initialData?.isOffer ?? false,
    offerDescription: initialData?.offerDescription || "",
    images: initialData?.images || [],
    attributes: initialData?.attributes || [],
    variants: initialData?.variants?.map((v: any) => ({
      sku: v.sku || "",
      color: v.color || "",
      storage: v.storage || "",
      price: v.price?.toString() || "",
      originalPrice: v.originalPrice?.toString() || "",
      stock: v.stock?.toString() || "",
      images: v.images || [],
    })) || [],
    specifications: initialData?.specifications || {},
    ratingBreakdown: initialData?.ratingBreakdown || {
      performance: 0,
      buildQuality: 0,
      valueForMoney: 0,
    },
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingVariantIdx, setUploadingVariantIdx] = useState<number | null>(null);

  // Spec inputs
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  // Attribute inputs
  const [attrName, setAttrName] = useState("");
  const [attrValues, setAttrValues] = useState("");

  // Active tab for variants
  const [activeVariantIdx, setActiveVariantIdx] = useState<number>(0);

  const baseFileRef = useRef<HTMLInputElement>(null);
  const variantFileRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ── Base image upload ── */
  const handleBaseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      setUploading(true);
      const urls: string[] = [];
      for (const file of Array.from(e.target.files)) {
        urls.push(await uploadImage(file));
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
      toast.success("Images uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeBaseImage = (idx: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  /* ── Variant image upload ── */
  const handleVariantImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIdx: number
  ) => {
    if (!e.target.files) return;
    try {
      setUploadingVariantIdx(variantIdx);
      const urls: string[] = [];
      for (const file of Array.from(e.target.files)) {
        urls.push(await uploadImage(file));
      }
      setForm((prev) => {
        const updated = [...prev.variants];
        updated[variantIdx] = {
          ...updated[variantIdx],
          images: [...updated[variantIdx].images, ...urls],
        };
        return { ...prev, variants: updated };
      });
      toast.success("Variant images uploaded");
    } catch {
      toast.error("Variant upload failed");
    } finally {
      setUploadingVariantIdx(null);
    }
  };

  const removeVariantImage = (variantIdx: number, imgIdx: number) => {
    setForm((prev) => {
      const updated = [...prev.variants];
      updated[variantIdx] = {
        ...updated[variantIdx],
        images: updated[variantIdx].images.filter((_, i) => i !== imgIdx),
      };
      return { ...prev, variants: updated };
    });
  };

  /* ── Variant CRUD ── */
  const addVariant = () => {
    setForm((prev) => ({ ...prev, variants: [...prev.variants, emptyVariant()] }));
    setActiveVariantIdx(form.variants.length);
  };

  const removeVariant = (idx: number) => {
    setForm((prev) => ({ ...prev, variants: prev.variants.filter((_, i) => i !== idx) }));
    setActiveVariantIdx(Math.max(0, idx - 1));
  };

  const updateVariant = (idx: number, field: keyof ProductVariant, value: string) => {
    setForm((prev) => {
      const updated = [...prev.variants];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  /* ── Specifications ── */
  const addSpec = () => {
    if (!specKey.trim()) return;
    setForm((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [specKey.trim()]: specValue.trim() },
    }));
    setSpecKey("");
    setSpecValue("");
  };

  const removeSpec = (key: string) => {
    const updated = { ...form.specifications };
    delete updated[key];
    setForm((prev) => ({ ...prev, specifications: updated }));
  };

  /* ── Attributes ── */
  const addAttribute = () => {
    if (!attrName.trim()) return;
    const values = attrValues.split(",").map((v) => v.trim()).filter(Boolean);
    setForm((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { name: attrName.trim(), values }],
    }));
    setAttrName("");
    setAttrValues("");
  };

  const removeAttribute = (idx: number) =>
    setForm((prev) => ({ ...prev, attributes: prev.attributes.filter((_, i) => i !== idx) }));

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!form.name || !form.category) {
      toast.error("Name and Category are required");
      return;
    }
    await onSubmit({
      ...form,
      discountPrice: Number(form.discountPrice),
      originalPrice: Number(form.originalPrice),
      stock: Number(form.stock),
      variants: form.variants.map((v) => ({
        ...v,
        price: Number(v.price),
        originalPrice: Number(v.originalPrice),
        stock: Number(v.stock),
      })),
    });
  };

  /* ── Toggle helper ── */
  const toggle = (key: keyof FormState) =>
    setForm((prev) => ({ ...prev, [key]: !(prev[key] as boolean) }));

  /* ── Styles ── */
  const input =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition bg-white placeholder-gray-400";
  const label = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6";
  const sectionHead = "text-sm font-bold text-gray-800 mb-5 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <span>Products</span>
              <span>/</span>
              <span className="text-indigo-600 font-semibold">
                {initialData ? "Edit Product" : "Add New Product"}
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              {initialData ? "Edit Product" : "Add New Product"}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={uploading}
              className="px-5 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-semibold transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {initialData ? "Save Changes" : "Publish Product"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* ══════════════ LEFT (3 cols) ══════════════ */}
          <div className="lg:col-span-3 space-y-6">

            {/* Name & Description */}
            <div className={card}>
              <h3 className={sectionHead}>
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
                Name & Description
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={label}>Product Name <span className="text-red-400 normal-case">*</span></label>
                  <input
                    placeholder="e.g. Premium Half-Sleeve T-Shirt"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label}>Slug</label>
                  <input
                    placeholder="e.g. premium-half-sleeve-t-shirt"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label}>Description</label>
                  <textarea
                    placeholder="Describe your product in detail..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${input} h-28 resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className={card}>
              <h3 className={sectionHead}>
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
                Category
              </h3>
              <div>
                <label className={label}>Product Category <span className="text-red-400 normal-case">*</span></label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`${input} appearance-none pr-9`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Base Product Images */}
            <div className={card}>
              <h3 className={sectionHead}>
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">3</span>
                Base Product Images
                <span className="ml-auto text-xs font-normal text-gray-400 normal-case">Used when no variant is selected</span>
              </h3>
              <div
                onClick={() => baseFileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-400">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 group-hover:text-indigo-600 transition">Click to upload images</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP • Max 10MB each</p>
                  </>
                )}
                <input ref={baseFileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleBaseImageUpload} />
              </div>
              {form.images.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} className="w-20 h-20 rounded-xl object-cover border border-gray-200" alt={`base-${i}`} />
                      <button
                        onClick={() => removeBaseImage(i)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center shadow"
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Variants */}
            <div className={card}>
              <div className="flex items-center justify-between mb-5">
                <h3 className={`${sectionHead} mb-0`}>
                  <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">4</span>
                  Product Variants
                </h3>
                <button
                  onClick={addVariant}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Variant
                </button>
              </div>

              {form.variants.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
                  <p className="text-sm text-gray-400">No variants added yet.</p>
                  <p className="text-xs text-gray-300 mt-1">Click "Add Variant" to create variants with their own images, prices and stock.</p>
                </div>
              ) : (
                <>
                  {/* Variant tabs */}
                  <div className="flex gap-2 flex-wrap mb-5">
                    {form.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveVariantIdx(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                          activeVariantIdx === i
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        {v.sku || `Variant ${i + 1}`}
                      </button>
                    ))}
                  </div>

                  {/* Active variant editor */}
                  {form.variants[activeVariantIdx] && (
                    <div className="bg-slate-50 rounded-xl p-5 space-y-5 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-700">
                          {form.variants[activeVariantIdx].sku || `Variant ${activeVariantIdx + 1}`}
                        </p>
                        <button
                          onClick={() => removeVariant(activeVariantIdx)}
                          className="text-xs text-red-400 hover:text-red-600 font-medium transition"
                        >
                          Remove
                        </button>
                      </div>

                      {/* SKU, Color, Storage */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className={label}>SKU <span className="text-red-400 normal-case">*</span></label>
                          <input
                            placeholder="e.g. SKU-001"
                            value={form.variants[activeVariantIdx].sku}
                            onChange={(e) => updateVariant(activeVariantIdx, "sku", e.target.value)}
                            className={input}
                          />
                        </div>
                        <div>
                          <label className={label}>Color</label>
                          <input
                            placeholder="e.g. Black"
                            value={form.variants[activeVariantIdx].color}
                            onChange={(e) => updateVariant(activeVariantIdx, "color", e.target.value)}
                            className={input}
                          />
                        </div>
                        <div>
                          <label className={label}>Storage</label>
                          <input
                            placeholder="e.g. 256GB"
                            value={form.variants[activeVariantIdx].storage}
                            onChange={(e) => updateVariant(activeVariantIdx, "storage", e.target.value)}
                            className={input}
                          />
                        </div>
                      </div>

                      {/* Prices & Stock */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className={label}>Discount Price</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                              placeholder="0.00"
                              value={form.variants[activeVariantIdx].price}
                              onChange={(e) => updateVariant(activeVariantIdx, "price", e.target.value)}
                              className={`${input} pl-7`}
                              type="number"
                              min={0}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={label}>Original Price</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                              placeholder="0.00"
                              value={form.variants[activeVariantIdx].originalPrice}
                              onChange={(e) => updateVariant(activeVariantIdx, "originalPrice", e.target.value)}
                              className={`${input} pl-7`}
                              type="number"
                              min={0}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={label}>Stock</label>
                          <input
                            placeholder="0"
                            value={form.variants[activeVariantIdx].stock}
                            onChange={(e) => updateVariant(activeVariantIdx, "stock", e.target.value)}
                            className={input}
                            type="number"
                            min={0}
                          />
                        </div>
                      </div>

                      {/* Variant Images */}
                      <div>
                        <label className={label}>Variant Images</label>
                        <div
                          onClick={() => variantFileRefs.current[activeVariantIdx]?.click()}
                          className="border-2 border-dashed border-indigo-200 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition-all group"
                        >
                          {uploadingVariantIdx === activeVariantIdx ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                              <p className="text-xs text-gray-400">Uploading...</p>
                            </div>
                          ) : (
                            <>
                              <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <p className="text-xs font-semibold text-gray-500 group-hover:text-indigo-600 transition">Upload images for this variant</p>
                            </>
                          )}
                          <input
                            ref={(el) => { variantFileRefs.current[activeVariantIdx] = el; }}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleVariantImageUpload(e, activeVariantIdx)}
                          />
                        </div>

                        {form.variants[activeVariantIdx].images.length > 0 && (
                          <div className="flex gap-3 mt-3 flex-wrap">
                            {form.variants[activeVariantIdx].images.map((img, ii) => (
                              <div key={ii} className="relative group">
                                <img src={img} className="w-16 h-16 rounded-lg object-cover border border-gray-200" alt={`variant-img-${ii}`} />
                                <button
                                  onClick={() => removeVariantImage(activeVariantIdx, ii)}
                                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center shadow"
                                >×</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Attributes */}
            <div className={card}>
              <h3 className={sectionHead}>
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">5</span>
                Product Attributes
              </h3>
              <div className="space-y-3">
                {form.attributes.map((attr, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700 mb-1.5">{attr.name}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {attr.values.map((v, vi) => (
                          <span key={vi} className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-medium">{v}</span>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => removeAttribute(i)} className="text-gray-300 hover:text-red-500 transition mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <input
                    placeholder="Attribute (e.g. Color)"
                    value={attrName}
                    onChange={(e) => setAttrName(e.target.value)}
                    className={`${input} flex-1`}
                  />
                  <input
                    placeholder="Values comma-separated (e.g. Red, Blue)"
                    value={attrValues}
                    onChange={(e) => setAttrValues(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addAttribute()}
                    className={`${input} flex-1`}
                  />
                  <button
                    onClick={addAttribute}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition flex-shrink-0"
                  >Add</button>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className={card}>
              <h3 className={sectionHead}>
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">6</span>
                Specifications
              </h3>
              <div className="space-y-3">
                {Object.entries(form.specifications).map(([key, value]) => (
                  <div key={key} className="flex gap-2 items-center">
                    <input value={key} readOnly className={`${input} flex-1 bg-slate-50`} />
                    <input value={value as string} readOnly className={`${input} flex-1 bg-slate-50`} />
                    <button onClick={() => removeSpec(key)} className="text-gray-300 hover:text-red-500 transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <input
                    placeholder="Key (e.g. Material)"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    className={`${input} flex-1`}
                  />
                  <input
                    placeholder="Value (e.g. Cotton)"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSpec()}
                    className={`${input} flex-1`}
                  />
                  <button
                    onClick={addSpec}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition flex-shrink-0"
                  >Add</button>
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className={card}>
              <h3 className={sectionHead}>
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">7</span>
                SEO / Meta
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={label}>Meta Title</label>
                  <input
                    placeholder="SEO title"
                    value={form.metaTitle}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label}>Meta Description</label>
                  <textarea
                    placeholder="SEO description"
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    className={`${input} h-24 resize-none`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT (2 cols) ══════════════ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pricing */}
            <div className={card}>
              <h3 className={sectionHead}>
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pricing
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={label}>Discount Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                      <input
                        placeholder="0.00"
                        value={form.discountPrice}
                        onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                        className={`${input} pl-7`}
                        type="number"
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={label}>Original Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                      <input
                        placeholder="0.00"
                        value={form.originalPrice}
                        onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                        className={`${input} pl-7`}
                        type="number"
                        min={0}
                      />
                    </div>
                  </div>
                </div>

                {/* Auto-computed discount badge */}
                {form.discountPrice && form.originalPrice && Number(form.originalPrice) > 0 && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-xs font-semibold text-emerald-700">
                      {Math.round(((Number(form.originalPrice) - Number(form.discountPrice)) / Number(form.originalPrice)) * 100)}% discount applied
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Inventory */}
            <div className={card}>
              <h3 className={sectionHead}>
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Inventory
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Base Stock</label>
                  <input
                    placeholder="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className={input}
                    type="number"
                    min={0}
                  />
                </div>
                <div>
                  <label className={label}>Warranty</label>
                  <input
                    placeholder="e.g. 1 Year"
                    value={form.warranty}
                    onChange={(e) => setForm({ ...form, warranty: e.target.value })}
                    className={input}
                  />
                </div>
              </div>
            </div>

            {/* Visibility & Flags */}
            <div className={card}>
              <h3 className={sectionHead}>
                <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Visibility & Flags
              </h3>
              <div className="space-y-4">
                {(
                  [
                    { key: "isActive", label: "Active", desc: "Product is live on store", color: "bg-emerald-500" },
                    { key: "isFeatured", label: "Featured", desc: "Shown in featured section", color: "bg-amber-500" },
                    { key: "isSuggestedForHome", label: "Suggest for Home", desc: "Displayed on homepage", color: "bg-sky-500" },
                    { key: "isOffer", label: "Is Offer", desc: "Mark as promotional offer", color: "bg-rose-500" },
                  ] as { key: keyof FormState; label: string; desc: string; color: string }[]
                ).map(({ key, label: lbl, desc, color }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{lbl}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                    <button
                      onClick={() => toggle(key)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${(form[key] as boolean) ? color : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${(form[key] as boolean) ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}

                {form.isOffer && (
                  <div className="pt-1 border-t border-gray-100">
                    <label className={label}>Offer Description</label>
                    <input
                      placeholder="e.g. Summer sale — 20% off"
                      value={form.offerDescription}
                      onChange={(e) => setForm({ ...form, offerDescription: e.target.value })}
                      className={input}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className={card}>
              <h3 className={sectionHead}>
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Rating Breakdown
                <span className="ml-auto text-xs font-normal text-gray-400 normal-case">Seed values</span>
              </h3>
              <div className="space-y-5">
                {(
                  [
                    { key: "performance", label: "Performance" },
                    { key: "buildQuality", label: "Build Quality" },
                    { key: "valueForMoney", label: "Value for Money" },
                  ] as { key: keyof RatingBreakdown; label: string }[]
                ).map(({ key, label: lbl }) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{lbl}</label>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">
                        {form.ratingBreakdown[key]}/5
                      </span>
                    </div>
                    <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all"
                        style={{ width: `${(form.ratingBreakdown[key] / 5) * 100}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={0.5}
                      value={form.ratingBreakdown[key]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ratingBreakdown: { ...form.ratingBreakdown, [key]: parseFloat(e.target.value) },
                        })
                      }
                      className="w-full accent-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={uploading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {initialData ? "Save Changes" : "Publish Product"}
              </button>
              <button
                type="button"
                className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
              >
                Save as Draft
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}