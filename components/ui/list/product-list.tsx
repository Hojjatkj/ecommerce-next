"use client";

import { Product, ProductsListProps } from "@/types/type";
import { useEffect, useMemo, useState } from "react";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

import ProductSearch from "../ProductSearch";
import ProductFilters, { SortOption } from "../ProductFilters";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { getCategoryName } from "@/lib/utils";
import ProductGrid from "./product-grid";
import Pagination from "./Pagination";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";

const PAGE_SIZE = 20;

export default function ProductList({
  products,
}: ProductsListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLoading = products.length === 0;
  const showEmptyMessage = useDelayedFlag(isLoading, 3000);

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q") ?? ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "all"
  );

  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "newest"
  );

  const [priceRange, setPriceRange] = useState<
    [number, number] | null
  >(() => {
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");

    return min && max
      ? [Number(min), Number(max)]
      : null;
  });

  /* =========================
     URL Parameters
  ========================== */

  const updateParams = (
    updates: Record<string, string | null>
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(
      `${pathname}${params.toString() ? `?${params}` : ""}`,
      {
        scroll: false,
      }
    );
  };

  const setPage = (page: number) => {
    updateParams({
      page: page <= 1 ? null : String(page),
    });
  };

  /* =========================
     Categories
  ========================== */

  const categories = useMemo(() => {
    const names = new Set<string>();

    products.forEach((p) => {
      const name = getCategoryName(p);

      if (name && name !== "بدون نام") {
        names.add(name);
      }
    });

    return Array.from(names).sort((a, b) =>
      a.localeCompare(b, "fa")
    );
  }, [products]);

  /* =========================
     Filter + Sort
  ========================== */

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();

    const filtered = products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        getCategoryName(p).toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" ||
        getCategoryName(p) === selectedCategory;

      const matchesPrice =
        !priceRange ||
        (p.price >= priceRange[0] &&
          p.price <= priceRange[1]);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

    const finalPrice = (p: Product) =>
      p.discount_percent && p.discount_percent > 0
        ? p.price -
          (p.price * p.discount_percent) / 100
        : p.price;

    const sorted = [...filtered];

    switch (sortBy) {
      case "price-asc":
        sorted.sort(
          (a, b) => finalPrice(a) - finalPrice(b)
        );
        break;

      case "price-desc":
        sorted.sort(
          (a, b) => finalPrice(b) - finalPrice(a)
        );
        break;

      case "discount":
        sorted.sort(
          (a, b) =>
            (b.discount_percent ?? 0) -
            (a.discount_percent ?? 0)
        );
        break;

      case "newest":
      default:
        sorted.sort((a, b) => b.id - a.id);
        break;
    }

    return sorted;
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
  ]);

  /* =========================
     Pagination
  ========================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / PAGE_SIZE
    )
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * PAGE_SIZE;

    return filteredProducts.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredProducts, currentPage]);

  /* =========================
     Price Bounds
  ========================== */

  const priceBounds = useMemo(() => {
    if (products.length === 0) {
      return {
        min: 0,
        max: 1000000,
      };
    }

    const prices = products.map((p) => p.price);

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  /* =========================
     Reset page after filters
  ========================== */

  useEffect(() => {
    if (currentPage !== 1) {
      setPage(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
  ]);

  /* =========================
     Fix invalid page
  ========================== */

  useEffect(() => {
    if (currentPage > totalPages) {
      setPage(totalPages);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  return (
    <div className="w-full min-w-0">
      {/* =========================
          Breadcrumb
      ========================== */}

      <div className="m-2">
        <Breadcrumb
          items={[
            {
              label: "خانه",
              href: "/",
            },
            {
              label: "محصولات",
              href:
                selectedCategory !== "all"
                  ? "/products"
                  : undefined,
            },
            ...(selectedCategory !== "all"
              ? [{ label: selectedCategory }]
              : []),
          ]}
        />
      </div>

      {/* =========================
          Search + Filters
      ========================== */}

      <div
        className="
          w-full
          px-2
          py-2
          sm:px-3
          md:px-4
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            gap-3

            md:flex-row
            md:items-center
          "
        >
          {/* Title */}
          <div
            className="
              relative
              hidden
              h-12
              shrink-0
              items-center
              justify-center

              md:flex
              md:w-32
              lg:w-36
              xl:w-40
            "
          >
            <Image
              src="/icons/G7a3R1IzOO.svg"
              alt=""
              width={120}
              height={48}
              className="
                h-12
                w-full
                object-contain
                opacity-80
              "
            />

            <h2
              className="
                absolute
                whitespace-nowrap
                text-sm
                font-bold
                text-gray-800
              "
            >
              جستجو در محصولات
            </h2>
          </div>

          {/* Search + Filter */}
          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              gap-3

              sm:flex-row
              sm:items-center

              md:flex-1
            "
          >
            {/* Search */}
            <div
              className="
                w-full
                min-w-0
                flex-1
              "
            >
              <ProductSearch
                onSearch={setSearchTerm}
              />
            </div>

            {/* Filter */}
            <div
              className="
                w-full
                shrink-0

                sm:w-auto
              "
            >
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                priceRange={priceRange}
                priceBounds={priceBounds}
                onPriceChange={setPriceRange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Products
      ========================== */}

      {isLoading ? (
        showEmptyMessage ? (
          <p className="py-10 text-center text-gray-500">
            اینجا هیچ محصولی نیست....
          </p>
        ) : (
          <ProductGrid products={[]} />
        )
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <img
            src="./empty-box.png"
            alt=""
            className="
              w-24
              animate-float
              opacity-80
              md:w-32
            "
          />

          <p
            className="
              mt-4
              text-center
              text-lg
              text-gray-500
              md:text-xl
            "
          >
            محصولی با این خصوصیات یافت نشد
          </p>
        </div>
      ) : (
        <>
          <p
            className="
              m-2
              px-2
              text-sm
              text-muted-text
              md:px-0
            "
          >
            نمایش{" "}
            {(
              (currentPage - 1) * PAGE_SIZE + 1
            ).toLocaleString("fa-IR")}{" "}
            تا{" "}
            {Math.min(
              currentPage * PAGE_SIZE,
              filteredProducts.length
            ).toLocaleString("fa-IR")}{" "}
            از{" "}
            {filteredProducts.length.toLocaleString(
              "fa-IR"
            )}{" "}
            محصول
          </p>

          <ProductGrid
            products={paginatedProducts}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}