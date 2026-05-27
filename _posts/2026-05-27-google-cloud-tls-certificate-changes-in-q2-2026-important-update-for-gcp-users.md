---
date: 2026-05-27T11:02:00+02:00
published: false
author: Richard
category: Security
tags:
  - Google
title: Google Cloud TLS Certificate Changes in Q2 2026 - Important Update for GCP users
image: ''
image_alt: ''
layout: post
card_items: []
---

If you manage client applications that interact with Google Cloud services, please take note of an upcoming infrastructure change. In **Q2 2026**, Google is updating the Transport Layer Security (TLS) certificates for many of its endpoints to improve overall efficiency.

Here is a breakdown of what to expect, who might be impacted, and the steps you need to take.

---

## What is Changing?

Google is shifting its intermediate Certificate Authority (CA) and certificate type.

* **The Shift:** Services (including `googleapis.com`) will transition from an RSA certificate chain and leaf certificate to an **ECDSA certificate**.
* **The Science:** This shift aligns with modern cryptographic best practices. The Elliptic Curve Digital Signature Algorithm (ECDSA) provides equivalent security to RSA at significantly smaller key sizes, which reduces computational overhead, decreases memory usage, and improves overall TLS handshake performance ([Al-Zubaidie et al., 2022](https://www.google.com/search?q=https://doi.org/10.17762/ijcnis.v11i1.3827)).
* **New Authority:** Endpoints will now use the **Google Trust Services WE1** intermediate certificate.

## Potential Impact

For the vast majority of users, **no action is required**, and this transition will happen seamlessly. However, if your client applications are not configured correctly, they may fail to connect to Google services after the update.

Connection failures are most likely to occur under the following two scenarios:

1. **Certificate Pinning:** Google strongly discourages pinning intermediate or leaf certificates. Hardcoding certificates creates operational inflexibility; when certificates naturally expire or are rotated by the Certificate Authority, pinned applications cannot establish a chain of trust and will suffer connection failures ([Chothia et al., 2017](https://www.google.com/search?q=https://doi.org/10.1007/978-3-319-70972-7_33)). If your application relies on this practice, it will likely break during this routine rotation.
2. **Custom Trust Stores:** If your environment utilizes a custom trust store, missing the required Google Trust Services (GTS) Root CAs will result in connection outages.

---

## What You Need to Do

If your cloud projects use a limited set of trusted roots or rely on certificate pinning, you must take action **before June 15, 2026**.

### Action Checklist:

* **Verify Trust Stores:** Ensure that your system trusts *all* Google Trust Services Root CAs. You can find the full list of required roots in the official Google Trust Services Certificates documentation.
* **Update Pin Lists (If Applicable):** While pinning is discouraged, if your security policies require it, ensure that all Google Trust Services Roots (and applicable intermediates) are actively included in your pin list prior to the deadline.

> **Timeline Note:** Services will begin shifting to the new intermediates continuously throughout late Q2 2026. Do not wait until the last minute to verify your configurations.

---

## References

Al-Zubaidie, M., Zhang, Z., & Zhang, J. (2022). Efficient and Secure ECDSA Algorithm and its Applications: A Survey. *International Journal of Communication Networks and Information Security (IJCNIS)*, *11*. [https://doi.org/10.17762/ijcnis.v11i1.3827](https://www.google.com/search?q=https://doi.org/10.17762/ijcnis.v11i1.3827)
Cited by: 96

Chothia, T., Garcia, F. D., Heppell, C., & Stone, C. M. (2017). Why Banker Bob (Still) Can’t Get TLS Right: A Security Analysis of TLS in Leading UK Banking Apps. *Lecture Notes in Computer Science*, 579–597. [https://doi.org/10.1007/978-3-319-70972-7_33](https://www.google.com/search?q=https://doi.org/10.1007/978-3-319-70972-7_33)
Cited by: 24
