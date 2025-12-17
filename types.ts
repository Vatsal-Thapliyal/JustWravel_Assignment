export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
}

export interface NavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ProductsClientProps {
  products: Product[];
  currentPage: number;
  productCategories: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface ProductListingPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export type SortOption = 'default' | 'price-low-high' | 'price-high-low';

export interface ProductFilterProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
  onSortChange: (sortOption: SortOption) => void;
  selectedCategory?: string;
  selectedSort?: SortOption;
}