# MJA Bags — Premium E-Commerce Platform

A production-grade e-commerce platform built with Next.js 15, TypeScript, Supabase, Drizzle ORM, BetterAuth, and Paystack.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL) + Drizzle ORM
- **Auth**: BetterAuth
- **Payments**: Paystack
- **Storage**: Supabase Storage
- **Styling**: TailwindCSS + shadcn/ui
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (store)/            # Store routes
│   ├── admin/              # Admin dashboard (role-protected)
│   ├── api/                # API routes (auth, webhooks, upload)
│   ├── auth/               # Login / Register pages
│   ├── account/            # User dashboard
│   ├── checkout/           # Checkout flow
│   └── orders/             # Order confirmation
├── actions/                # Server Actions
│   ├── products.ts
│   ├── categories.ts
│   ├── orders.ts
│   └── payment.ts
├── components/
│   ├── ui/                 # Base UI components
│   ├── layout/             # Header, Footer
│   ├── product/            # Product card, gallery, add-to-cart
│   ├── cart/               # Cart drawer
│   ├── shop/               # Filters, pagination
│   ├── admin/              # Admin-specific components
│   └── account/            # Account components
├── db/
│   ├── schema/             # Drizzle schema definitions
│   ├── migrations/         # Generated SQL migrations
│   └── index.ts            # DB connection
├── lib/
│   ├── auth/               # BetterAuth config + helpers
│   ├── payment/            # Paystack integration
│   ├── validation/         # Zod schemas
│   ├── supabase.ts         # Supabase client + storage
│   ├── cart-context.tsx    # Cart state provider
│   └── utils.ts            # Utility functions
├── hooks/
│   └── use-cart.ts         # Cart localStorage hook
└── types/
    └── index.ts            # Shared TypeScript types
```

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd mja-bags
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in all required values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (Direct connection for Drizzle)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# BetterAuth
BETTER_AUTH_SECRET=generate-with-openssl-rand-base64-32
BETTER_AUTH_URL=https://your-domain.com

# Paystack
PAYSTACK_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_WEBHOOK_SECRET=your-webhook-secret

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 3. Set up Supabase Storage

1. Go to Supabase Dashboard → Storage
2. Create a bucket called `product-images`
3. Set bucket to **Public**
4. Add the following RLS policy for uploads (service role bypasses RLS)

### 4. Run database migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Create an admin user

After registering a user account, update their role directly in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### 6. Set up Paystack Webhooks

1. Go to Paystack Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks/paystack`
3. Copy the webhook secret to `PAYSTACK_WEBHOOK_SECRET`

### 7. Run development server

```bash
npm run dev
```

## Deployment (Vercel)

```bash
vercel --prod
```

Set all environment variables in Vercel dashboard. Use Supabase connection pooling URL (port 6543) for `DATABASE_URL` in production for better performance with serverless.

## Admin Access

Navigate to `/admin` after setting your user role to `admin`. Admin features:

- **Dashboard**: Revenue, orders, products, customer stats
- **Products**: Full CRUD with image upload
- **Categories**: Manage product categories
- **Orders**: View all orders, update order status

## Payment Flow

1. Customer fills checkout form → Server Action creates order in DB
2. Paystack payment initialized → Customer redirected to Paystack
3. Customer completes payment → Paystack redirects to `/orders/confirm`
4. Server verifies transaction with Paystack API
5. Order and payment status updated in DB
6. Paystack webhook also fires for redundancy (idempotent processing)
