# Grove & Gold — premium e-commerce concept
### A Heavies frontend demonstration

> **This is a fictional demonstration.** The product name, brand identity, packaging, prices, orders and food descriptions are illustrative. Replace them with client-approved details before showing the site as the client's actual brand.

## 1. Run on your Mac / Windows PC

Install **Node.js 20.9+** (Node 22 LTS recommended), unzip this project, then open a terminal inside the project folder:

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

Useful links:

- Home: `http://localhost:3000/`
- Collection: `http://localhost:3000/shop`
- Interactive product viewer: `http://localhost:3000/products/golden-original`
- Demo checkout: `http://localhost:3000/checkout`
- Admin entry: `http://localhost:3000/admin/login`
- Admin dashboard demo: `http://localhost:3000/admin`

No `.env` secrets are required to run the demo.

## 2. Client demo walkthrough

1. Open the homepage. Show the Aurora shader, premium layout, responsive design and 3D jar rotation.
2. Open the collection. Filter and sort fictional products.
3. Open a product. Rotate the jar by dragging or using its range slider, choose quantity and add it to the bag.
4. Click the bag icon. Update quantities, see totals and proceed to checkout.
5. At checkout, enter **fictional test information only**. The fee, payment options and checkout flow are **not real**. The final button ends the simulation; it DOES NOT initiate PayHere or create an order.
6. Open `/admin/login` and choose **Enter demo dashboard**. There is no live authentication in this frontend prototype.
7. In the admin dashboard, edit a product price or add a sample product. Return to the shop and see the changes in the same browser.
8. Demonstrate the curved draggable gallery, GSAP text ribbon, bell toggle and interactive star rating. The bell and rating save nothing to a server.

## 3. Project structure

```text
src/
  app/
    layout.tsx                # Global root: context, navigation, footer, notice
    page.tsx                  # Editorial landing page with animations
    globals.css               # Design system and responsive layouts
    shop/page.tsx             # Filterable catalog
    products/[slug]/page.tsx  # Product detail and 3D jar rotation
    checkout/page.tsx         # FORM-ONLY checkout simulation
    admin/login/page.tsx      # Admin entry PREVIEW (not real login)
    admin/page.tsx            # Admin dashboard UI and product editor
    policies/[policy]/page.tsx # Policy PLACEHOLDERS, not legal documents
  components/
    Jar3D.tsx                 # Interactive CSS 3D jar concept
    ProductCard.tsx           # Reusable catalog card
    CartDrawer.tsx            # Bag and quantity controls
    SiteHeader.tsx            # Navigation and shopping bag
    SiteFooter.tsx            # Footer navigation/policies
    CookieBanner.tsx          # Accurate local-storage notice
    animations/
      Aurora.jsx              # OGL shader
      BellToggle.jsx          # Motion spring/ring bell
      PeekRating.jsx          # User-provided rating component
      CircularCarousel.jsx    # User-provided curved carousel
      TextLoop.jsx            # GSAP animated SVG text path
  context/ShopContext.tsx     # Demo-only products/cart state + localStorage
  data/products.ts            # All sample product info and prices
  lib/format.ts               # Currency + demonstration delivery fee
public/assets/               # Locally stored SVG illustration assets
```

## 4. How state works (beginner-friendly)

`ShopProvider` is a React Context wrapper. It shares the sample product list and cart with every page. When you click **Add to bag**, `addToCart()` updates shared state. The cart drawer, checkout and product pages all read the same updated information.

`saveProduct()` changes the same product list from the admin preview. A `useEffect()` mirrors that state into browser local storage so changes survive refreshing. **Local storage is neither secure authentication nor a production database.** Anyone using that browser can change it.

To connect the real website later, replace the client-side product and cart operations with server-backed validated operations using Supabase/Postgres and secure server routes.

## 5. Animations included

| Animation | Where to see it | Library |
|---|---|---|
| Aurora background | Homepage hero | `ogl` |
| Ringing bell toggle | Launch teaser | `motion` |
| Interactive star rating | Feedback widget | Hugeicons + React |
| 3D curved carousel | A closer look section | React + CSS transforms |
| Curved moving text | Between teaser and feedback | `gsap` |
| Rotating product jar | Homepage and product detail | CSS 3D transforms + React pointer input |

All core layouts have mobile breakpoints and `prefers-reduced-motion` adjustments.

## 6. Before production (not optional)

- Confirm actual brand name, logos, product images, ingredients, allergens, stock, size, pricing, delivery regions, taxes and claims.
- Implement **server-side** admin login, multi-factor authentication, sessions, admin role checks, rate limiting and logging. The current `/admin` route is open by design because this is a frontend prototype.
- Implement a real database with protected policies, server-authoritative pricing, inventory, and orders. Do not accept amounts from the browser.
- Connect PayHere's official integration; verify the gateway `notify_url` signature and final payment state on the **server**. Make retries idempotent. The current form performs no payment.
- Replace the demo policies with accurate client-approved terms, privacy, cookie, returns and delivery documents; obtain jurisdiction-specific legal review.
- Verify business details, consent requirements, accessibility and cookie behavior. Do not invent testimonials or unsupported product claims.
- Perform accessibility, responsive, keyboard, WebGL fallback, security, payment and recovery testing before going live.
- Remove the no-index setting in `src/app/layout.tsx` **only after real information is approved** and SEO pages are ready.
- Confirm component and artwork licensing for commercial production use.

## 7. Deployment

Push the project to a GitHub repository and import it into Vercel (commercial production deployments require appropriate plan eligibility). Set the project root to the folder containing `package.json`, then deploy. No backend or credentials are required for the frontend demo.

**Current functional scope:** storefront UI, search/sort, item detail, interactive packaging, bag, checkout simulation, locally editable admin catalog, animated sections, accessibility foundations and sample policy pages.

**Not implemented:** production authentication, server data persistence, emails/notifications, real orders, actual PayHere, secure payments, real customer accounts, user data deletion workflows, production shipping, live stock, legal compliance guarantees, production SEO submissions.

## 8. Formatting code to study it

The important files contain explanatory comments. The central React logic is separated from visual styling. After `npm install`, run:

```bash
npm run format
```

This applies Prettier to the components and pages, producing readable indentation that is easier to study line by line in VS Code.
