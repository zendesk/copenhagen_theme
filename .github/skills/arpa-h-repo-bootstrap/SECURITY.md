# Security Policy

This policy governs vulnerability research and reporting for ARPA-H systems and services under the [HHS Vulnerability Disclosure Policy](https://www.hhs.gov/vulnerability-disclosure-policy/index.html).

---

## Reporting a Vulnerability

**Report all security issues using GitHub's private vulnerability reporting feature.**

Click **"Report a vulnerability"** on the [Security Advisories](../../security/advisories) tab. Do not open a public issue or report through email, Slack, or any other channel.

Your report will be received securely, kept confidential, and routed to the right people. See [GitHub's documentation](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) for how the process works.

> **Note:** The HHS VDP also accepts reports at [hhs.responsibledisclosure.com](https://hhs.responsibledisclosure.com). For vulnerabilities in this repository or ARPA-H systems hosted here, use the GitHub report link above so the responsible team is notified directly.

Please include:
- What the vulnerability is and its potential impact
- Where it was found
- Steps to reproduce (proof-of-concept scripts or screenshots are helpful)

---

## Authorization

*Issued under the [HHS VDP — Authorization](https://www.hhs.gov/vulnerability-disclosure-policy/index.html#authorization).*

Good faith research conducted under this policy is authorized. ARPA-H and HHS will work with you to resolve issues quickly and will not pursue legal action related to your research.

---

## Guidelines

*Issued under the [HHS VDP — Guidelines](https://www.hhs.gov/vulnerability-disclosure-policy/index.html#guidelines).*

Authorized research means you:

- Notify us as soon as possible after discovering a real or potential security issue
- Avoid privacy violations, user experience degradation, production system disruption, and data destruction or manipulation
- Use exploits only to the extent necessary to confirm a vulnerability — do not exfiltrate data, establish access or persistence, or pivot to other systems
- Allow a reasonable amount of time to resolve the issue before public disclosure
- Do not compromise the privacy, safety, intellectual property, or financial interests of HHS/ARPA-H personnel or third parties

If you discover a vulnerability or encounter any sensitive data (PII, financial, proprietary, or trade secrets), **stop testing, report immediately via the GitHub private vulnerability report, and do not disclose the data to anyone else**.

---

## Scope

*Issued under the [HHS VDP — Scope](https://www.hhs.gov/vulnerability-disclosure-policy/index.html#scope).*

`arpa-h.gov` and all its subdomains are in scope. Vendor systems are out of scope — report those to the vendor directly.

Unsure if a system is in scope? Contact [support@responsibledisclosure.com](mailto:support@responsibledisclosure.com) before testing.

---

## Rules of Engagement

*Issued under the [HHS VDP — Rules of Engagement](https://www.hhs.gov/vulnerability-disclosure-policy/index.html#rules-engagement).*

**Must not:**
- Test systems outside the scope above
- Disclose vulnerability information except as described in this policy
- Conduct physical testing, social engineering, or phishing
- Execute denial-of-service or resource exhaustion attacks
- Introduce malicious software
- Degrade, impair, disrupt, or disable HHS/ARPA-H systems
- Test third-party applications or services that integrate with ARPA-H systems
- Delete, alter, share, retain, destroy, or exfiltrate HHS/ARPA-H data
- Use an exploit to establish access, persistence, or pivot to other systems

**May:**
- View or store ARPA-H nonpublic data only as necessary to document a potential vulnerability

**Must:**
- Cease testing and immediately report any vulnerability or nonpublic data exposure via the GitHub private vulnerability report
- Purge any stored ARPA-H nonpublic data upon reporting

---

## Disclosure

*Issued under the [HHS VDP — Disclosure](https://www.hhs.gov/vulnerability-disclosure-policy/index.html#disclosure).*

Do not share details about discovered vulnerabilities for **90 calendar days** after receiving our acknowledgment. If you believe earlier disclosure is warranted, coordinate with us in advance.

Reports may be shared with [CISA](https://www.cisa.gov/) and affected vendors under their [coordinated vulnerability disclosure process](https://www.cisa.gov/coordinated-vulnerability-disclosure-process). We will not share your name or contact information without explicit permission.

---

## Questions

Email [HHS.Cybersecurity@hhs.gov](mailto:HHS.Cybersecurity@hhs.gov) or see the [HHS VDP](https://www.hhs.gov/vulnerability-disclosure-policy/index.html#questions).
