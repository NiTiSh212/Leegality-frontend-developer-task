# Shopline — Product Listing & Detail App

A small e-commerce catalog built against the [DummyJSON Products API](https://dummyjson.com/docs/products), built for the Leegality Frontend Engineer assessment.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Stack

- React 18 (functional components + hooks)
- React Router v6
- Plain CSS (no UI library)
- Vite for tooling

## Architecture

- `src/api.js` — thin fetch wrappers around the DummyJSON endpoints.
- `src/components/` — `ProductCard`, `FilterPanel`, `Pagination`: presentational, reusable, no data fetching.
- `src/pages/ListingPage.jsx` — owns category/price/brand filter state, pagination, and the product grid. Filter and page state live in the URL query string (`?category=...&minPrice=...&brands=...&page=...`) via `useSearchParams`.
- `src/pages/DetailPage.jsx` — fetches a single product by id and renders its details, with a back button that returns to the listing carrying the same query string.

## Assumptions

- Filtering is done client-side against the full product set (the API caps at 194 products), since brand isn't a queryable DummyJSON parameter and combined category + price + brand filtering needs a single in-memory pass.
- "Selecting a category" re-filters the already-fetched pool rather than re-querying `/products/category/{category}`, to keep all three filters composable without race conditions between requests.
- Brand selection is multi-select (checkboxes), per the spec's "single or multi-select" allowance.
- Pagination is client-side over the filtered set, 12 products per page.

## Architectural decisions

- **URL as state**: filters and the current page live in the query string instead of component state alone. This satisfies the "previously selected filters should remain applied when navigating back" requirement for free, and makes listing state shareable/bookmarkable.
- **One fetch on mount**: the full product list and category list are fetched once when the listing page mounts; all filtering/pagination after that is synchronous and instant, avoiding loading spinners on every filter tweak.
- **Dedicated loading/error states**: both pages show explicit loading and error banners rather than blank screens, per the "proper loading state" / "proper error handling" requirements.

## Improvements with more time

- Debounced min/max price inputs and input validation (currently accepts any number, including min > max).
- Server-driven pagination (`limit`/`skip`) as a fallback for very large catalogs, with client-side filtering only within the current page when brand/price filters are off.
- Unit tests for the filtering logic and a couple of component tests (React Testing Library).
- Skeleton loading cards instead of a text banner.
- Persist last viewed scroll position when navigating back from detail to listing.
