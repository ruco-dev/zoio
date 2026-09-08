---
lifecycle: ritual
recurrence: on-demand
network: required
---

# first-launch

> **Sleeve resident and card mint.** This is a read-only generator, not the
> first-release checklist. Playing it creates or refreshes the persistent
> `.flowdeck/.crunchdeck/launches/v0.0.0/` card. Play that child card to do
> launch work. Later releases use `flowdeck play launches`.

## BOT

- [ ] Mint or refresh `.flowdeck/.crunchdeck/launches/v0.0.0/TODO.md` and
  `LAUNCH.md` as the first-launch work card. Do not perform its release gates
  in this sleeve. Do not edit this sleeve's `TODO.md`: do not check off this
  item, append comments or tokens, reset it, or record outcomes here.
  The child card must own the following work:
  - verify that no non-baseline release, git tag, or applicable registry
    publication already exists; otherwise stop and direct the user to
    `flowdeck play launches`;
  - inspect package, `FLOWDECK.md`, and `PROFILE.md` to capture the product,
    package identity, owner, and north-star signal;
  - run and verify fresh vulnerability and publish-readiness gates, stopping
    on a non-clean or non-ready verdict;
  - populate `LAUNCH.md` from the launch template, including its initial
    shipped-work summary and an **Awaiting human decision** Go / No-Go row;
  - provide a `lifecycle: one-shot` child `TODO.md` with launch verification,
    an explicit human Go / No-Go decision, and a dormant `publish` action that
    requires Go, fresh gates, and passing build, lint, and test evidence.

## HUMAN

> Review and make release decisions only in
> `.flowdeck/.crunchdeck/launches/v0.0.0/`; this sleeve deliberately retains
> no run state.

#### COMMENTS
<!-- tokens 2026-09-08 play(Glinder): in=222701 out=5700 -->
