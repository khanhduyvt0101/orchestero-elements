# Namecheap DNS for Vercel

Configure this record in Namecheap for `elements.orchestero.com`:

| Type         | Host       | Value                  | TTL       |
| ------------ | ---------- | ---------------------- | --------- |
| CNAME Record | `elements` | `cname.vercel-dns.com` | Automatic |

Notes:

- Add only the host prefix `elements`, not `elements.orchestero.com`.
- Remove any existing `A`, `AAAA`, URL redirect, or CNAME record for the same `elements` host before adding this record.
- If the Vercel dashboard shows a project-specific CNAME value for this domain, use that exact value instead.
- If Vercel asks for ownership verification, add the TXT record that Vercel shows in the dashboard, then verify again.

After DNS propagates, run:

```bash
dig CNAME elements.orchestero.com +short
npx vercel domains add elements.orchestero.com orchestero-elements --scope khanh-duy-projects
npx vercel domains inspect elements.orchestero.com --scope khanh-duy-projects
```
