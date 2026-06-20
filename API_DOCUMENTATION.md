# Quang Portfolio CMS — API Documentation

**Strapi v5 · Base URL:** `http://localhost:1337` (dev) / replace with production URL

All responses follow the Strapi v5 envelope:

```json
{
  "data": { ... },
  "meta": { ... }
}
```

Media fields return a populated `url` string (e.g. `/uploads/image.png`). Prefix with the CMS base URL to get the full path.

---

## Authentication

Public endpoints must be enabled in **Settings → Roles → Public** inside the Strapi admin panel. No token is needed for public read routes.

---

## Content Types

### 1. About Page _(Single Type)_

A single instance that holds the homepage/about section content.

#### `GET /api/about-page`

Returns the about page entry.

**Query params**

| Param | Example | Description |
|-------|---------|-------------|
| `populate` | `populate=*` | Populate all relations and components |
| `populate[action_buttons]` | `populate[action_buttons]=*` | Populate only action buttons component |
| `populate[social_buttons]` | `populate[social_buttons]=*` | Populate only social buttons component |
| `populate[stack_images]` | `populate[stack_images]=*` | Populate stack images media |
| `populate[avatar]` | `populate[avatar]=*` | Populate avatar media |

**Recommended fetch (populate everything):**

```
GET /api/about-page?populate=*
```

**Response shape**

```json
{
  "data": {
    "id": 1,
    "documentId": "abc123",
    "username": "quang.laam (steve)",
    "job_title": "Senior UX/UI designer",
    "short_description": "As a designer working at the intersection...",
    "action_buttons": [
      {
        "id": 1,
        "label": "View Work",
        "link": "/work",
        "icon": {
          "url": "/uploads/icon.svg",
          "width": 24,
          "height": 24
        }
      }
    ],
    "social_buttons": [
      {
        "id": 1,
        "label": "LinkedIn",
        "link": "https://linkedin.com/in/...",
        "icon": {
          "url": "/uploads/linkedin.svg"
        }
      }
    ],
    "stack_images": [
      {
        "id": 1,
        "url": "/uploads/figma.png",
        "name": "figma.png",
        "width": 48,
        "height": 48
      }
    ],
    "avatar": {
      "id": 2,
      "url": "/uploads/avatar.jpg",
      "width": 400,
      "height": 400
    },
    "publishedAt": "2024-01-01T00:00:00.000Z"
  },
  "meta": {}
}
```

**Field reference**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `username` | string | Yes | Display name |
| `job_title` | string | Yes | Role / headline |
| `short_description` | text | Yes | Bio paragraph |
| `action_buttons` | `SocialsButton[]` | No | CTA buttons (repeatable component) |
| `social_buttons` | `SocialsSocials[]` | No | Social links (repeatable component) |
| `stack_images` | Media[] | No | Tool/stack logos |
| `avatar` | Media | Yes | Profile photo |

---

### 2. Articles _(Collection Type)_

Portfolio articles / case studies. Supports draft/publish workflow.

#### `GET /api/articles`

Returns a paginated list of published articles.

**Query params**

| Param | Example | Description |
|-------|---------|-------------|
| `populate` | `populate=*` | Populate all relations |
| `populate[categories]` | `populate[categories]=*` | Populate categories |
| `populate[thumbnail]` | `populate[thumbnail]=*` | Populate thumbnail media |
| `filters[categories][slug][$eq]` | `filters[categories][slug][$eq]=branding` | Filter by category slug |
| `filters[is_link][$eq]` | `filters[is_link][$eq]=false` | Filter by link-type articles |
| `sort` | `sort=publishedAt:desc` | Sort order |
| `pagination[page]` | `pagination[page]=1` | Page number |
| `pagination[pageSize]` | `pagination[pageSize]=12` | Items per page |

**Recommended fetch:**

```
GET /api/articles?populate[thumbnail]=*&populate[categories]=*&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=12
```

**Response shape**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "xyz789",
      "title": "Redesigning the checkout flow",
      "short_description": "How we reduced drop-off by 40%.",
      "slug": "redesigning-the-checkout-flow",
      "is_link": false,
      "link": null,
      "thumbnail": {
        "id": 5,
        "url": "/uploads/thumbnail.jpg",
        "width": 800,
        "height": 600
      },
      "categories": [
        {
          "id": 1,
          "documentId": "cat001",
          "category_name": "UX Research",
          "slug": "ux-research"
        }
      ],
      "content": [ ... ],
      "publishedAt": "2024-03-15T10:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 12,
      "pageCount": 3,
      "total": 30
    }
  }
}
```

#### `GET /api/articles/:documentId`

Returns a single article by its `documentId`.

**Recommended fetch:**

```
GET /api/articles/xyz789?populate=*
```

> **Note on `content` field:** This is a Strapi Blocks (rich text) field. It returns a JSON array of block nodes — use the [`@strapi/blocks-react-renderer`](https://www.npmjs.com/package/@strapi/blocks-react-renderer) package on the frontend to render it.

**Field reference**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | Yes | Unique |
| `short_description` | text | No | Card preview text |
| `slug` | uid | No | URL-safe identifier, auto-generated from `title` |
| `thumbnail` | Media | Yes | Cover image or video |
| `is_link` | boolean | Yes | If `true`, the article is an external link only (no content body) |
| `link` | text | No | External URL; used when `is_link` is `true` |
| `categories` | Category[] | No | Many-to-many with Category |
| `content` | blocks | Yes | Rich text (Strapi Blocks format) |

---

### 3. Categories _(Collection Type)_

Tags used to classify articles.

#### `GET /api/categories`

Returns all categories.

**Recommended fetch:**

```
GET /api/categories?sort=category_name:asc
```

**Response shape**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "cat001",
      "category_name": "UX Research",
      "slug": "ux-research",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 5
    }
  }
}
```

#### `GET /api/categories/:documentId`

Returns a single category. Optionally populate its articles:

```
GET /api/categories/cat001?populate[articles][populate][thumbnail]=*
```

**Field reference**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `category_name` | text | Yes | Unique |
| `slug` | uid | Yes | Auto-generated from `category_name` |
| `articles` | Article[] | No | Many-to-many (inverse side) |

---

## Components

Components are embedded objects returned inline when their parent is populated. They are not standalone endpoints.

### `socials.button` — Action Button

Used in `about-page.action_buttons`.

| Field | Type | Required |
|-------|------|----------|
| `label` | string | Yes |
| `link` | text | No |
| `icon` | Media | No |

### `socials.socials` — Social Link

Used in `about-page.social_buttons`.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `label` | text | Yes | Unique — platform name (e.g. "LinkedIn") |
| `link` | text | Yes | Full URL |
| `icon` | Media | No | Platform icon |

### `about-page.about-section` — About Section

Grouped list section (e.g. Experience, Education). Not yet attached to a content type — defined for future use.

| Field | Type | Required |
|-------|------|----------|
| `section_title` | text | Yes |
| `section_items` | `SectionItem[]` | Yes (min 1) |

### `about-page.section-item` — Section Item

A single timeline/list row inside an `about-section`.

| Field | Type | Required |
|-------|------|----------|
| `time` | text | Yes |
| `content` | blocks | Yes |

### `work-page.work-item` — Work Item

A portfolio project card. Not yet attached to a top-level content type.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | Yes | |
| `description` | text | Yes | |
| `year` | string | Yes | |
| `link` | text | No | External project URL |
| `background_color` | hex color string | Yes | e.g. `#1A1A2E` |
| `text_color` | hex color string | No | e.g. `#FFFFFF` |
| `work_cards` | `WorkCard` | Yes | Single nested work card |

### `work-page.work-card` — Work Card

A thumbnail card nested inside a `work-item`.

| Field | Type | Required |
|-------|------|----------|
| `title` | text | Yes |
| `thumbnail` | Media (image/video) | Yes |
| `progress` | integer (0–100) | Yes |

### `work-page.introduction` — Introduction

A simple text introduction block.

| Field | Type | Required |
|-------|------|----------|
| `text` | text | Yes |

### `lab-page.lab-item` — Lab Item

An experimental/lab showcase item.

| Field | Type | Required |
|-------|------|----------|
| `title` | string | Yes |
| `thumbnail` | Media (image/video) | Yes |

---

## Common Patterns

### Fetch about page with all media

```js
const res = await fetch(`${CMS_URL}/api/about-page?populate=*`)
const { data } = await res.json()
```

### Fetch article list (card view)

```js
const res = await fetch(
  `${CMS_URL}/api/articles?populate[thumbnail]=*&populate[categories]=*&sort=publishedAt:desc&pagination[pageSize]=12`
)
const { data, meta } = await res.json()
```

### Fetch single article (detail page) by slug

Strapi v5 doesn't natively filter by `slug` on a single-entry route; filter on the collection and take the first result:

```js
const res = await fetch(
  `${CMS_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`
)
const { data } = await res.json()
const article = data[0]
```

### Filter articles by category slug

```js
const res = await fetch(
  `${CMS_URL}/api/articles?filters[categories][slug][$eq]=${categorySlug}&populate[thumbnail]=*&populate[categories]=*`
)
```

### Render Strapi Blocks content (React)

```bash
npm install @strapi/blocks-react-renderer
```

```jsx
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

export function ArticleContent({ content }) {
  return <BlocksRenderer content={content} />
}
```

---

## Media URLs

All media `url` values are relative paths. Prepend the CMS base URL:

```js
const imageUrl = `${CMS_URL}${article.thumbnail.url}`
```

---

## Draft & Publish

All three content types have draft/publish enabled. The API only returns **published** entries by default — no extra parameter needed.

---

## Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request / invalid filter |
| `401` | Unauthorized (endpoint not made public) |
| `403` | Forbidden |
| `404` | Entry not found |
| `500` | Server error |
