# Jotform build spec — Supreme Commercial Coatings enquiry form

Rebuild the site's contact form in Jotform field-for-field. Pair with
`jotform-custom.css` (Form Designer → Styles → Inject Custom CSS).

**Form title:** Request a Free Roof Inspection
**Sub-heading:** No cost, no obligation. We inspect it, document it, and tell you whether it needs a repair, a restoration or a replacement — in writing, before anyone talks price.

---

## Fields, in order

| # | Jotform field type | Label | Required | Notes |
|---|---|---|---|---|
| 1 | Full Name (or Short Text) | `Name` | **Yes** | Placeholder: `Your name` |
| 2 | Phone | `Phone` | **Yes** | Placeholder: `(___) ___-____` · US format mask |
| 3 | Email | `Email` | **Yes** | Placeholder: `you@company.com` · enable email validation |
| 4 | Dropdown | `Property type` | No | Default **Commercial** — see options below |
| 5 | Dropdown | `City` | No | Default **Houston** — see options below |
| 6 | Dropdown | `What do you need?` | No | Default **Roof Restoration & Coatings** |
| 7 | Long Text | `Tell us about the roof` | No | 5 rows · placeholder below |
| 8 | — | Submit button | — | Text: **Request my free inspection** |

**Field 7 placeholder:**
`Age of the roof, square footage, whether it's leaking, and anything an adjuster has already told you.`

**Under the submit button** (Text field, small):
`No cost, no obligation. We never sell your details.`

---

## Dropdown options

### 4 — Property type
```
Commercial
Residential
Multi-site portfolio
Church / non-profit
```

### 5 — City
```
Houston
Cypress
Katy
Missouri City
Spring
Tomball
Richmond
Rosenberg
Pearland
Webster
Humble
New Caney
Conroe
Waller
Sealy
Brookshire
Manvel
Fresno
Other / not listed
```

### 6 — What do you need?
```
Roof Restoration & Coatings
Flat & Commercial Roofing
Roof Repair
Storm & Hail Restoration
Insurance Claim Assistance
Roof Replacement
Metal Roofing
Shingle Roofing
Not sure — I need an inspection
```

---

## Settings worth turning on

| Setting | Where | Why |
|---|---|---|
| **Email notification → tyler@mysupremehome.com** | Settings → Emails | Otherwise submissions sit in Jotform only |
| **Autoresponder to the submitter** | Settings → Emails | Confirms you received it; set reply-to `tyler@mysupremehome.com` |
| **Enable reCAPTCHA / honeypot** | Form Elements → Widgets | The site form uses a hidden honeypot; Jotform has this built in |
| **Thank-you message** | Settings → Thank You Page | Copy below |
| **Continue forms later: OFF** | Settings → Form Settings | Not useful for a short enquiry form |

**Thank-you copy** (matches the site's success state):

> **Request received**
> We will call you to schedule the inspection, usually the same business day. If it is urgent, call us directly on (346) 781-9895 and we will get a crew out sooner.

---

## Embedding it back into the site

The site currently posts to its own `/api/lead` route, which validates and logs
but **does not deliver anywhere**. Two options:

1. **Replace the built-in form** — swap `<ContactForm />` in
   `app/contact/page.tsx` for Jotform's iframe embed. Simplest, and Jotform
   handles delivery, spam and storage.
2. **Keep the built-in form** and point `/api/lead` at Jotform's submission
   endpoint so the styling stays native and Jotform still receives the lead.

Option 1 is the faster route to a working lead path. Option 2 keeps the faster,
better-integrated form and is worth doing once there's time.
