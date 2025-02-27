---
title: How to Fix ERR_NAME_NOT_RESOLVED and DNS_PROBE_FINISHED_BAD_CONFIG Errors in Google Chrome due to DNS
date: 2024-11-20T14:10:00
author: Richard
image: /RDjarbeng/assets/images/dns_post/dns_error.webp
video: ""
layout: post
categories: ["Help"]
tags: [Fix DNS errors, No internet errors, DNS, fix]
---
If you're encountering the **ERR_NAME_NOT_RESOLVED** or **DNS_PROBE_FINISHED_BAD_CONFIG** errors in Google Chrome, these are typically caused by issues with your DNS (Domain Name System) server. 

### Is this really a DNS error?

To check if this really is a DNS error and not another you can try these 2 steps to verify. First open the command prompt/terminal. 

1. **Ping IP address**

What we will do is to ping an IP address which should work even if we have a DNS error. In this case we will use Google's IP address for their DNS servers. What a ping does is to send a relatively small amount of packets to the IP address and measures how long it takes to receive them. This serves as a tool we can use to check if we are able to access the internet by sending packets to another device on the internet.

In the terminal window type  this command and hit enter 

`ping 8.8.8.8`

 If it is successful you should see a result like the image below. In case the response continues after 4 tries hit ctrl+c to stop it.

![Ping google DNS ip ](/RDjarbeng/assets/images/dns_post/dns_test_ip.png)

2. **Ping URL**

Now we will try to ping a URL 'google.com'. In In the terminal window type  this command and hit enter

 `ping google.com`

If it is successful you should see a result like the image below. In case the response continues after 4 tries hit ctrl+c to stop it.
![Ping google URL ](/RDjarbeng/assets/images/dns_post/dns_test_google.png)

If the 1st request to the IP address worked but the second one to the url `google.com` did not succeed then we have confirmed that you have a DNS problem. DNS is supposed to resolve the site address, for example `google.com`, to an IP address such as `8.8.8.8`.  So if we are able to reach the IP but not the site address then we have a DNS problem.

Below are two effective solutions to resolve these errors.

### 1. Restart Your Router

The first and simplest step is to restart your router. This forces your router to obtain a new DNS configuration from your Internet Service Provider (ISP).

**Steps:**

- Power off your router.
- Wait for about 5 minutes.
- Turn the router back on.
- Try accessing the website again.

This often resolves DNS issues by refreshing the connection between your router and ISP.

### 2. Manually Set DNS Settings

If restarting the router doesn't work, or router is not in your control, you can manually configure your DNS settings to use reliable public DNS servers like Google DNS or OpenDNS.

**Steps for windows users:**

1. Click on **Start**, then click on **Settings**.
2. Navigate to **Network & Internet**.
3. Select **Ethernet**, then click on **Change adapter options**.
4. Right-click on the network adapter you're using and select **Properties**.
5. In the list, find and select **Internet Protocol Version 4 (TCP/IPv4)**, then click **Properties**.
6. Choose **Use the following DNS server addresses** and enter one of the following sets of DNS servers:

- **Google DNS:**
    - Preferred: `8.8.8.8`
    - Alternate: `8.8.4.4`
   
- **OpenDNS:**
    - Preferred: `208.67.220.222`
    - Alternate: `208.67.222.220`

7. Click **OK** in both windows to save the settings.
8. Try accessing the website again.

By manually setting a public DNS server, you bypass any potential issues with your ISP's default DNS settings.

---

### Why Does This Error Happen?

These errors occur due to problems with DNS resolution, which is the process of converting a domain name (like www.example.com) into an IP address that computers use to locate each other on the internet.

Here are some common causes:

- **DNS cache issues:** Your computer or browser may store outdated or corrupted DNS information.
- **Misconfigured or faulty DNS servers:** The default DNS servers provided by your ISP may have issues or be temporarily down, preventing proper resolution of domain names.
- **Network configuration problems:** Incorrect network settings can interfere with how your system communicates with DNS servers.
- **Security software interference:** Firewalls or antivirus programs may block access to certain websites by interfering with DNS requests.

Switching to reliable public DNS servers like Google DNS or OpenDNS can help mitigate these issues by providing more stable and faster domain name resolution.

### IP Addresses for Manually Setting the DNS

When manually configuring your DNS settings, you can use either Google Public DNS or OpenDNS for more reliable performance:

- **Google Public DNS:**
- Preferred: `8.8.8.8`
- Alternate: `8.8.4.4`
- **OpenDNS:**
- Preferred: `208.67.220.222`
- Alternate: `208.67.222.220`

These addresses are globally recognized for their speed, reliability, and security, making them excellent alternatives to ISP-provided DNS servers.

---

### References:

- [Microsoft Community Forums - Windows 10 ERR_NAME_NOT_RESOLVED bug](https://answers.microsoft.com/en-us/windows/forum/all/windows-10-errnamenotresolved-bug/8fcba1ed-f1bb-47b8-b326-f9d56babd9a4)
- [Appuals - Best Fix Steps for DNS_PROBE_FINISHED_BAD_CONFIG](https://appuals.com/best-fix-steps-fix-dns_probe_finished_bad_config/)
- [What is my DNS server- top10 vpn](https://www.top10vpn.com/tools/what-is-my-dns-server/)
- [Google developers DNS](https://developers.google.com/speed/public-dns/docs/using?hl=en)
- [What is DNS -Fortinet](https://www.fortinet.com/resources/cyberglossary/what-is-dns)
