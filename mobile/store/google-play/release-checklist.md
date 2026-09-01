# Google Play Release Checklist

## Repository-ready items

- [x] Permanent application ID: `com.queuewise.queuewise`.
- [x] Display name: `QueueWise`.
- [x] Branded legacy, adaptive, and Android 13 themed launcher icons.
- [x] English (United States) listing copy validated against Play length limits.
- [x] Signed App Bundle workflow with explicit version name and version code.
- [x] Production HTTPS, Firebase, Maps, and signing validation.
- [x] Engineering draft of the Data Safety inventory.

## Owner-provided items

- [ ] Merge the release-build branch and this stacked branch into `main` in order.
- [ ] Provision and smoke-test the production backend.
- [x] Expose the configured privacy policy and external deletion page in-app.
- [x] Delete authenticated accounts after current-password confirmation.
- [ ] Publish the active privacy-policy and external deletion-request URLs.
- [x] Provide repository-owned privacy-policy and deletion-request routes.
- [ ] Deploy both routes and configure their final HTTPS URLs in the production
  mobile build and Play Console.
- [ ] Export the source icon as a 512 x 512, 32-bit PNG no larger than 1024 KB.
- [ ] Capture at least two current phone screenshots from a production-like build.
- [ ] Create a 1024 x 500 feature graphic without misleading claims.
- [ ] Review and paste `listing-en-US.json` into the default store listing.
- [ ] Complete Data Safety, ads, target audience, content rating, and app-access
  declarations in Play Console.
- [ ] Provide reviewer credentials for both customer and merchant roles without
  exposing production owner credentials.
- [ ] Upload the signed `.aab` to an internal test track and resolve every
  pre-launch report issue.
- [ ] Complete two-device customer/merchant acceptance before promotion.

Do not promote directly to production. Start with an internal test track, then
use a controlled testing track after the acceptance checks pass.
