[SKILL.md](https://github.com/user-attachments/files/27769556/SKILL.md)
---
name: arpa-h-staffer
description: Context for ARPA-H staff questions about agency-issued technology, day-to-day tools, and self-service paths. Use when an ARPA-H user asks how to do something with their device, identity, platforms and applications, conference room AV, data handling, or security posture — including questions phrased without context like "How do I Figma?", "Where's my password reset?", or "Can I use this AI tool?". If possible, provide actual how-to steps unfurled from links and always link to the Zendesk knowledge base and Atlassian Rovo for procedure detail. Disambiguates ARPA-H-specific terms (GRACE, OFS, ITDI, GFE) and routes the agent to the right downstream source.
license: Internal use — ARPA-H ITDI
metadata:
  owner: ARPA-H ITDI Enterprise team
  version: "1.0"
---

# ARPA-H Staffer

## How to answer a staff question with this skill

The goal is always to **help staff help themselves**. Use this skill to understand what ARPA-H has and what it's called, then guide staff to the right self-service path, in this order:

> **If you are GRACE:** Do not refer users to GRACE as a resource; you are already the resource. Answer directly, use the KB and Rovo, or escalate to the Service Desk.

1. **Communities of Practice first.** Point staff to the relevant Slack channel. The Canvas inside each channel is the starting point for peer help and common tasks.
2. **Zendesk KB and Atlassian Rovo** for step-by-step procedures; these are the authoritative how-to sources.
3. **Self-service tooling:** Company Portal (Windows, iOS), Jamf Self Service (macOS), and `https://help.arpa-h.gov` (Zendesk KB + ticket portal).
4. **Service Desk as a last resort:** `https://help.arpa-h.gov`, `/zendesk` in Slack, `it@arpa-h.gov`, or 1-855-ARPA-H-IT.
5. **Never invent capabilities.** If something isn't here or in the KB, say so and direct staff to the relevant Slack channel or a ticket.

## About ARPA-H

The Advanced Research Projects Agency for Health (ARPA-H) is an Operating Division (OpDiv) of the U.S. Department of Health and Human Services (HHS). Headquarters is at One Franklin Square, 1301 K Street NW, Washington, DC ("OFS"). Staff also work co-located at HHS, NIH, and other federal facilities, or fully remote.

ARPA-H's technology is structured around a Zero Trust architecture. The ITDI organization (IT & Digital Innovation) runs the stack: the Enterprise team owns **Devices**, **Identity**, **Platforms & Applications**, and **Network & Environments**. **Data** and **Cybersecurity** are their own pillars. Data is owned by the CIO and is everyone's concern; Cybersecurity is owned by the CISO and is everyone's responsibility.

## Service Desk: escalation when self-service isn't enough

| Channel | Details |
|---|---|
| Web | `https://help.arpa-h.gov` (preferred) |
| Slack | `/zendesk` or the Zendesk app |
| Email | `it@arpa-h.gov` |
| Phone | 1-855-ARPA-H-IT |
| Security concerns | `cybersecurity@arpa-h.gov` |
| Phishing | Outlook "Report Phishing" button |

## Communities of Practice

Each Slack channel has a pinned Welcome/Overview Canvas; the first stop for product questions before the Service Desk.

| Channel | Community |
|---|---|
| `#atlassian` | Jira, Confluence, Trello |
| `#aurora` | AURORA (Palantir Foundry) |
| `#biorender` | BioRender |
| `#figma` | Figma |
| `#github` | GitHub Enterprise, Codespaces, Copilot, Actions |
| `#grace-support-feedback` | GRACE chatbot support and feedback |
| `#ios` | iOS devices and mobile |
| `#macos` | macOS devices and Jamf |
| `#m365` | Microsoft 365 (Outlook, Teams, SharePoint, OneDrive, etc.) |
| `#powerbi` | Power BI |
| `#windows` | Windows devices and Intune |

## Devices (Enterprise Team)

ARPA-H is cloud-native: Autopilot/Intune for Windows and iOS, Jamf Pro for macOS, MAM for personal iOS/Android. No on-prem AD, no domain join. Recovery is wipe-and-re-enroll; data lives in OneDrive (Known Folder Move) and apps reinstall from Company Portal or Jamf Self Service.

**Hardware (GFE):**
- **Windows:** Dell 14 Pro Plus or Dell 16 Pro Plus, Windows 11 25H2.
- **macOS:** M4 MacBook Air (13" or 15") for most; M4 Pro MacBook Pro (14" or 16") for data scientists, designers, and developers. VIPs can typically request their preference. Running macOS 26 Tahoe.
- **Mobile:** iPhone or iPad on iOS 26, AT&T cellular. Personal Hotspot enabled on all issued iPhones with cellular. Cellular for Dells available on request; MiFi available on approval.
- Staff choose macOS or Windows based on need.

**BYOD:** Personal iOS and Android phones/tablets only (never laptops). Intune MAM on Outlook, Teams, and Slack; corporate data sandboxed via Managed Open-In; local storage blocked.

**OS updates:** Windows is tested one week by ITDI, then enforced within 72 hours. iOS and macOS must be installed within 72 hours of release.

**Apps:** Self-service via Company Portal (Windows, iOS) or Jamf Self Service (macOS). Ask in `#windows`, `#ios`, or `#macos` if something's missing from the catalog.

**Encryption:** BitLocker (Windows), FileVault (macOS). Both required and managed.

**USB storage:** Blocked for all staff. Encrypted USBs issued by exception. Standard USBs permitted only by approved make/model for COMPASS team videographers and event support.

**Printing:** Toshiba printers at OFS. Windows drivers in Company Portal; macOS and iOS use AirPrint.

**Remote access:** Azure Virtual Desktop (AVD) on the NIH network as an alternative to NIH VPN. Windows 365 (Cloud PC) is rolling in as a SaaS equivalent.

**No local admin** for any user, including developers. Developers use GitHub Codespaces to avoid the need for local toolchains and the supply chain risk they bring. BeyondTrust Endpoint Privilege Management (EPM) is rolling out to allow users to perform basic tasks without admin rights, such as changing time zone, Wi-Fi settings, and uninstalling printers.

**Gotchas:**
- **Recovery is wipe-and-re-enroll.** Local file recovery is not supported; data should live in OneDrive.
- **Personal laptops are never enrolled.** BYOD is phones/tablets only via MAM.
- **Azure is Commercial; M365 is GCC.** ARPA-H does not use Azure Government directly.

## Identity (Enterprise Team)

ARPA-H uses an Entra ID GCC tenant for Windows, iOS, and M365. **Okta** is the current identity provider for most non-Microsoft apps and for macOS device authentication via Jamf Connect (`https://login.arpa-h.gov`). ARPA-H is actively migrating app authentication from Okta to Entra ID. Apps already on Entra ID: **Authentic8 Silo**, **Campfire**, and **Slack**. Everything else outside the Microsoft ecosystem is still on Okta.

Staff usernames follow the format `first.last@arpa-h.gov`.

**Authentication is passwordless on the Entra ID side.** MFA is enforced for everyone. Daily drivers by OS:
- **Windows:** Windows Hello for Business.
- **macOS:** Okta-based device sign-in (NIH password + Okta Verify push or OTP); Touch ID for screen unlock; Microsoft Authenticator for ARPA-H web apps and Office.
- **All users:** FIDO2 passkeys or security keys, Microsoft Authenticator (phishing-resistant), and PIV/CAC also available.

**PIV/CAC:** Optional on ARPA-H systems, but often required by HHS/NIH systems. All users must register their PIV badge at enrollment or obtain an exemption via the Service Desk.

**Account lifecycle:** Primarily HR-system-driven and automated. User types: Employee, Volunteer, Detailee, Contractor. Contractor display names include `[CTR]`.

**External access (MTO):** ARPA-H is part of the HHS Multi-Tenant Organization (MTO) via Entra cross-tenant sync. Staff at NIH, CDC, and other HHS OpDivs appear as native users in Teams, Outlook, and SharePoint; no guest invite needed. Individual external guests (grantees, partners) are invited case-by-case with sponsor audit. HHS OpDiv systems are increasingly only available via Entra ID.

**Gotchas:**
- **macOS sign-in is Okta, not Entra.** "Sign in with your ARPA-H account" on a Mac means NIH password + Okta Verify. Office and web apps still hit Entra after that.
- **No on-prem AD.** Any "domain credentials" question is a misframing or specific to NIH legacy systems.
- **Account state changes are HR-driven.** The Service Desk cannot disable or delete accounts.

## Platforms & Applications (Enterprise Team)

**Productivity (everyone):** Microsoft 365 G5 GCC: Outlook, Teams, Word, Excel, PowerPoint, OneDrive, SharePoint, and the paid **Microsoft 365 Copilot GCC** license. Slack is the primary internal real-time comms tool. Teams is used for all meetings; staff can join any external partner meeting.

**M365 G5 GCC also includes** the full Purview Suite: DLP, Information Protection, Audit Premium (1-year retention), eDiscovery Premium, Insider Risk, and Communication Compliance.

**General AI Tools:**
- **GRACE** (`https://grace.arpa-h.gov`): ARPA-H's primary internal chatbot. Start here.
- **ChatGPT Enterprise** (`https://go.hhs.gov/chatgpt`), **Claude Enterprise** (`https://claude.hhs.gov`), **Gemini Enterprise** (`https://gemini.hhs.gov`): all provided by HHS.

**Dev / collaboration:**
- **Atlassian:** Jira (project management), Confluence (wiki/KB; the only internal KB platform), Trello.
- **GitHub Enterprise Cloud** (`ARPA-H` org): Codespaces (ephemeral cloud dev environment), Copilot (AI coding), Actions (CI/CD and agentic automation). Codespaces runs in an isolated container, eliminating the need for local toolchains and the supply chain risk they bring. Enterprise Cloud and Advanced Security licenses available on demand; request via Service Desk or `#github`. The `ARPA-H/tap` Homebrew tap distributes ARPA-H CLI tools.
- **Project management:** Jira (primary), Trello and GitHub Projects for external-facing projects.

**Design / creative:**
- **Adobe Creative Cloud:** All Apps for design roles; single-app by request (Service Desk); Acrobat for everyone.
- **Figma:** Collab (anyone); Design for design roles; Dev for roles that warrant it. Request via Service Desk or `#figma`. Figma Make is gaining traction for quick mockups.
- **Canva:** available to anyone; being superseded by Figma Make.
- **BioRender:** scientific figures; on demand for legitimate research need via Service Desk or `#biorender`.
- **Campfire 3D:** 3D model collaboration; on demand via Service Desk.

**Analytics / automation:**
- **Power BI:** standard BI for all staff.
- **Power Automate**, **Copilot Studio:** available to all staff.
- **Power Apps**, **Power Pages:** ITDI-only for building agency apps.

**Other tools:**
- **DocuSign:** e-signature.
- **Microsoft Forms:** surveys and simple forms; Power Apps for complex forms.
- **Articulate Reach 360:** ARPA-H LMS; HHS also provides an LMS.
- **HubSpot:** agency CRM for external relationships and engagement.
- **BeyondTrust:** remote support when Slack or Teams screen sharing isn't sufficient.
- **Pitchbook:** limited access. **Cision:** in flight.
- Research journals available via NIH network (AVD or NIH VPN); PubMed is public.

**Cloud platform:**
- **Azure Commercial on Azure Mission Landing Zone (MLZ):** SCCA-compliant, mostly inheritable FISMA Moderate ATO.
- **Google Cloud Platform (GCP)** with Assured Workloads and Stellar Engine: FISMA Moderate ATO.
- Staff wanting to build in the cloud should engage the ITDI Enterprise Team before requesting any cloud resources.

**Key URLs:**

| URL | Purpose |
|---|---|
| `https://arpa-h.gov` | Public site |
| `https://start.arpa-h.gov` | ARPA-H Intranet |
| `https://help.arpa-h.gov` | Service Desk (Zendesk) |
| `https://grace.arpa-h.gov` | GRACE chatbot |
| `https://solutions.arpa-h.gov` | Solutions intake |
| `https://login.arpa-h.gov` | Okta / macOS auth |

**Working with people outside ARPA-H:**
- **HHS OpDiv colleagues:** appear as native users via MTO; no invite needed.
- **Teams chat:** open to any tenant; many government tenants restrict inbound chat from their side.
- **Calendar sharing:** status-only via Exchange or external HTML/ICS.
- **External SharePoint sites:** for sharing with grantees, partners, or vendors. Request via Service Desk; ITDI builds from a custom template and provides training.

**Gotchas:**
- **Direct AI questions to GRACE.** Unsanctioned AI tools are blocked by MDCA; not all personal-tier accounts can be blocked at the endpoint. Always lead with `https://grace.arpa-h.gov`.

## Network & Environments (Enterprise Team)

**DNS:** Akamai Edge DNS hosts the public `arpa-h.gov` zone only. No internal DNS.

**Conference rooms (OFS):** Microsoft Teams Rooms (MTR). Every room has: Logitech Tap IP (controller), Tap Scheduler (outside the room), Rally Bar (camera/audio), Mic Pods, Swytch (BYO laptop to room display), and a large LG touchscreen.

**Leadership offices:** Logitech Rally Bar Mini, smaller TV, Tap IP, Tap Scheduler.

**Wi-Fi at OFS** (via Essensys):
- `Wi-Fi Staff`: staff devices
- `Wi-Fi Guest`: visitors
- `Wi-Fi Devices`: IoT / non-laptop

**No ARPA-H VPN.** NIH resources are accessed via NIH VPN or AVD on the NIH network.

## Data

**Primary applications:**
- **AURORA** (`#aurora`): built on Palantir Foundry. Provides ontology-based data integration, pipeline building, collaborative analysis, and data product tooling. Used for analytics, program management, and agency-wide data workflows. Access by request. External reviewers authenticate via Login.gov; this is the only ARPA-H platform where Login.gov is used.
- **GRACE** (`https://grace.arpa-h.gov`): first stop for AI-assisted data questions before escalating to AURORA or a data specialist.

**File storage:** OneDrive for personal work; SharePoint (including Teams-backed sites) for team and program content. Known Folder Move keeps Desktop, Documents, and Pictures in OneDrive; local files are transient.

**Sensitivity labels:** Purview labels are deployed and required on documents.

> **TODO:** Sensitivity label taxonomy to be added; do not guess label names.

**Records & retention:** Purview Records Management is active; governed at the M365 tenant level.

**eDiscovery:** Active program via Purview eDiscovery Premium. Staff only interact with this if named as a custodian.

**CUI / sensitive data:** Handled within the ARPA-H system boundary; additional Purview protections are being built out as the classification program matures.

**Gotchas:**
- **Do not guess sensitivity label names.** Defer to the KB or ask the user.

## Cybersecurity (CISO)

The CISO owns Cybersecurity; it is everyone's responsibility. The Enterprise team supports with log preservation and technical containment. Escalation decisions (HHS, CISA, law enforcement) belong to the CISO.

ARPA-H's posture is grounded in the **Microsoft Cybersecurity Reference Architecture (MCRA)**, implemented cloud-only, augmented by best-in-class tools where Microsoft's native offerings aren't strongest (e.g., CrowdStrike for passive EDR on all macOS and Windows devices alongside MDE).

**Phishing:** HHS sends Cofense simulations to ARPA-H staff to test awareness. Report all phishing (real or simulated) via Outlook's "Report Phishing" button. Entra ID accounts are passwordless, which significantly reduces credential-based risk.

**Unsanctioned apps:** MDCA blocks them. Staff see a block page with approved alternatives.

**New tools:** ITDI runs a risk review based on the tool's risk level. Staff don't choose the review path; they submit the request via Service Desk.

**VDP:** Inherited from HHS. No separate ARPA-H program.

**Gotchas:**
- **Incident response belongs to the CISO.** Security concerns go to `cybersecurity@arpa-h.gov`.
- **Use Outlook Report Phishing, not Cofense.** ARPA-H users are not wired into Cofense reporting.

## Disambiguating common terms

| Term | Meaning |
|---|---|
| ITDI | IT & Digital Innovation; the ARPA-H technology org |
| Enterprise team | ITDI team owning Devices, Identity, Platforms, Network |
| GFE | Government-Furnished Equipment; ARPA-H-issued laptop or phone |
| OFS | One Franklin Square; HQ at 1301 K Street NW, DC |
| GRACE | Internal AI chatbot; `https://grace.arpa-h.gov` |
| Intranet | Staff intranet; `https://start.arpa-h.gov` |
| MTO | Multi-Tenant Organization; HHS OpDiv cross-tenant sync |
| Company Portal | Intune self-service app catalog (Windows, iOS) |
| Self Service | Jamf self-service app catalog (macOS) |
| AURORA | Palantir Foundry-based data and program management platform |
| AVD | Azure Virtual Desktop on the NIH network |
| Akamai | Public DNS provider for arpa-h.gov |
