# Compliance-oriented checklist — PROTOTYPE, NOT A COMPLIANCE CERTIFICATE

The screenshot supplied for this project lists 20 common legal/UX checks. These cannot be fulfilled merely by a frontend mockup. The statuses below distinguish the example UI from real production work.

| Topic | Demo status | Production requirement |
|---|---|---|
| 1. Privacy policy | Clearly labeled illustrative page | Approved policy reflecting actual data flows |
| 2. Terms | Clearly labeled illustrative page | Approved legal business terms |
| 3. Refund policy | Illustrative page | Real refunds/food returns terms |
| 4. Cookie policy | Local storage notice | Audit any added tracking cookies |
| 5. Consent banner | Information notice, no marketing tracking | Consent management if legally required |
| 6. Form consent | No real submission | Collect only lawful, necessary consent |
| 7. Unnecessary data | Demo checkout doesn't transmit inputs | Data-minimization audit |
| 8. Third-party SDKs | OGL/Motion/GSAP/icons/frontend dependencies | Security, licensing and privacy audit |
| 9. Dark patterns | No manipulative urgency or bait offers | UX review and test |
| 10. Hidden fees | Sample delivery charge listed separately | Server-calculated verified fees |
| 11. Fake reviews | No invented customer testimonials | Publish only authorized authentic reviews |
| 12. Unsupported claims | Concept copy deliberately non-specific | Substantiate food and marketing claims |
| 13. Image alt text | Alt text on meaningful illustrations | Test full catalog and actual images |
| 14. Color contrast | Theme chosen for readable contrast | Automated and manual audits |
| 15. Keyboard navigation | Controls accessible where possible | Full keyboard and screen-reader test |
| 16. Business details | Demo brand clearly fictional | Real registered business information |
| 17. Children's data | No accounts or age collection | Review applicability if targeting minors |
| 18. Email unsubscribe | No marketing email collection | Unsubscribe flow if email marketing added |
| 19. Image/font licenses | Local original illustration and hosted fonts | Verify every commercial asset/component license |
| 20. Data deletion requests | No backend customer data | Build a production requests process if applicable |

Additional must-haves: server-side admin security, strong MFA, user-role authorization, verified PayHere callbacks, backup restore, shipping rules, customer support, and accessibility testing.
