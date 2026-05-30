---
date: 2026-05-27T11:02:00+02:00
published: true
author: Richard
category: Security
tags:
  - Google Cloud
  - Security
  - TLS
  - Networking
title: "Google Cloud TLS Certificate Changes in Q2 2026: Important Update for GCP users"
image: '/assets/images/posts/covers/gcp_tls_cover.jpg'
image_alt: 'A flat vector illustration of an ECDSA digital certificate being authenticated in a cloud environment'
layout: post
card_items:
  - name: "ECDSA Certificate"
    badge_1: "Cryptography"
    description: "A modern cryptographic algorithm that provides equivalent security to RSA at significantly smaller key sizes. This reduction in size translates to improved TLS handshake performance and lower computational overhead."
  - name: "Certificate Pinning"
    badge_1: "Security Practice"
    description: "The practice of hardcoding intermediate or leaf certificates in a client application. This operational practice is strongly discouraged as it frequently causes outages during routine certificate rotations."
  - name: "Google Trust Services"
    badge_1: "Certificate Authority"
    description: "The Certificate Authority responsible for issuing and managing certificates for Google services. They are providing the new WE1 intermediate certificate used in this infrastructure transition."
---

If you manage client applications that interact with Google Cloud services, please take note of an upcoming infrastructure change. In **Q2 2026**, Google is updating the Transport Layer Security (TLS) certificates for many of its endpoints to improve overall efficiency and security.

This update represents a critical shift in how Google secures data in transit. Here is a comprehensive breakdown of what to expect, who might be impacted, and the exact steps you need to take to ensure your services remain operational.

***

## What is Changing?

Google is shifting its intermediate Certificate Authority (CA) and the underlying certificate type used for secure connections.

* **The Shift:** Google Cloud services, including the heavily utilized `googleapis.com` endpoints, will transition from a traditional RSA certificate chain and leaf certificate to an **ECDSA certificate**.
* **The Science:** This shift aligns directly with modern cryptographic best practices. The Elliptic Curve Digital Signature Algorithm (ECDSA) provides equivalent security to RSA at significantly smaller key sizes. This reduction in key size drastically reduces computational overhead, decreases memory usage, and improves overall TLS handshake performance ([Al-Zubaidie et al., 2022](https://doi.org/10.17762/ijcnis.v11i1.3827)). The performance gains are particularly noticeable for mobile clients and edge devices.
* **New Authority:** Endpoints will now utilize the **Google Trust Services WE1** intermediate certificate to establish the chain of trust.

## Potential Impact

For the vast majority of users, **no action is required**, and this transition will happen completely seamlessly. However, if your client applications are not configured correctly, they may fail to connect to Google services after the update goes live.

Connection failures are most likely to occur under two specific scenarios:

1. **Certificate Pinning:** Google strongly discourages pinning intermediate or leaf certificates. Hardcoding certificates creates severe operational inflexibility. When certificates naturally expire or are rotated by the Certificate Authority, pinned applications cannot establish a chain of trust and will suffer immediate connection failures ([Chothia et al., 2017](https://doi.org/10.1007/978-3-319-70972-7_33)). If your application relies on this inflexible practice, it will likely break during this routine rotation.
2. **Custom Trust Stores:** If your operating environment utilizes a custom trust store, missing the required Google Trust Services (GTS) Root CAs will result in immediate connection outages. Applications must trust the root authority to validate the new certificates.

***

## What You Need to Do

If your cloud projects use a limited set of trusted roots or rely on certificate pinning, you must take action **before June 15, 2026**.

### Action Checklist:

* **Verify Trust Stores:** Ensure that your system trusts *all* Google Trust Services Root CAs. You can find the full list of required roots in the official Google Trust Services Certificates documentation.
* **Update Pin Lists:** While pinning is heavily discouraged, if your strict security policies require it, ensure that all Google Trust Services Roots and applicable intermediates are actively included in your pin list prior to the June 15 deadline.

> **Timeline Note:** Services will begin shifting to the new intermediates continuously throughout late Q2 2026. Do not wait until the last minute to verify your configurations. A proactive check now will save hours of troubleshooting later.

## Acknowledgements

The core details regarding this infrastructure change were originally communicated by the Google Cloud Team. We thank them for providing this essential heads up to the developer community and for their ongoing commitment to cloud security.

***

## References

Al-Zubaidie, M., Zhang, Z., & Zhang, J. (2022). Efficient and Secure ECDSA Algorithm and its Applications: A Survey. *International Journal of Communication Networks and Information Security (IJCNIS)*, *11*. [https://doi.org/10.17762/ijcnis.v11i1.3827](https://doi.org/10.17762/ijcnis.v11i1.3827)
Cited by: 96

Chothia, T., Garcia, F. D., Heppell, C., & Stone, C. M. (2017). Why Banker Bob (Still) Can't Get TLS Right: A Security Analysis of TLS in Leading UK Banking Apps. *Lecture Notes in Computer Science*, pages 579 to 597. [https://doi.org/10.1007/978-3-319-70972-7_33](https://doi.org/10.1007/978-3-319-70972-7_33)
Cited by: 24
