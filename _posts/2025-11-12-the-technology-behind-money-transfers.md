---
date: 2025-11-12T10:21:00
published: false
author: Richard
categories:
  - Money & Fintech
tags:
  - Money Transfers
  - Banking
  - SWIFT
  - ISO 20022
  - ACH
  - Mobile Money
  - Fintech
  - Payments
title: 'The Technology Behind Money Transfers: From Telegraph Wires to ISO 20022, Mobile Money, and Real-Time Settlement'
description: A comprehensive engineering analysis of financial transfer rails, comparing telegraphic wiring, correspondent Nostro-Vostro ledgers, ISO 20022 messaging, Wise liquidity netting, and telecom USSD protocols.
image: /assets/images/posts/covers/technology_behind_money_transfers_cover.jpg
image_alt: 'Architecture of financial transfer networks across physical, interbank, and fintech eras'
layout: post
key_points:
  - Electronic fund transfers do not move physical currency; they exchange authenticated cryptographic messages between synchronized balance sheets.
  - SWIFT functions strictly as a secure messaging transport rather than a settlement clearinghouse.
  - Modern remittance aggregators eliminate cross-border wire delays by operating local liquidity pools connected via double-entry ledger netting.
card_items:
  - title: Messaging versus Settlement
    description: Understanding the separation between SWIFT payment instructions and central bank gross settlement systems.
  - title: Liquidity Pool Netting
    description: How international remittance networks match internal bilateral cash flows without triggering foreign exchange wires.
  - title: Telecom Signaling Rails
    description: Mobile money architectures leverage SS7 USSD sessions and ISO 8583 financial switches to bank rural populations.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

How does money transfer work and what is the technology underneath.

Let's focus on the pre-internet (before widespread adoption of the internet and online banking) vs the post internet(introduction to transfers over the internet and web payments).

Pre-internet

Cheques...

Post Internet

SWIFT, ACH, Mobile Money, What service do Remittance providers like Remitly, Western Union, use?

Fintechs: Revolut, FlutterWave, Paypal, Stripe (paystack) what do these use, for internal between similar customers and external to other services and banks.

END WRITER NOTE -->

When an individual initiates a transfer on a smartphone banking application, funds appear in the recipient account seconds later. To the end user, money moves across the network like a streaming video packet. In financial computer science, money does not travel over physical cables. 

Money in the digital era consists of authenticated balance states distributed across institutional ledgers. An electronic funds transfer is an atomic state transition: a debit applied to one account, a credit applied to another, and an interbank settlement mechanism ensuring that debtor and creditor institutions remain financially whole.

The technical infrastructure enabling these state changes evolved across three distinct eras: physical paper clearing, standardized telecommunication networks, and distributed real-time application programming interfaces.

| Era | Dominant Technology | Clearing & Settlement Model |
| :--- | :--- | :--- |
| **1. Mechanical Era** | Physical cheques, courier bags, MICR optical sorting | End-of-day bilateral clearinghouse meetings with specie/gold settlement |
| **2. Networked Era** | Telex, SWIFT MT/MX messages, correspondent banks | Nostro/Vostro account balances and central bank batch clearing |
| **3. Real-Time Era** | REST APIs, ISO 20022 XML, USSD mobile wallets | Continuous atomic ledger updates and instant payment rails |

## The Mechanical and Telegraphic Era

Before the deployment of digital telecommunications, moving money across geographic distances required physical courier transit or telegraphic signaling.

### Physical Cheques and Clearinghouses

In the eighteenth and nineteenth centuries, payments relied on physical cheques. A cheque represents a written instrument directing a bank to pay a specific sum from the drawer account.

To settle checks drawn on different institutions without sending bank clerks to visit every competitor branch daily, banks established clearinghouses, beginning with the London Bankers Clearing House in the 1770s.

| Step | Phase in Historical Clearinghouse Cycle | Operational Activity |
| :--- | :--- | :--- |
| **1. Cheque Collection** | Customers deposit physical drafts across competitor branches | Clerks assemble paper cheques into outbound courier pouches |
| **2. Central Exchange** | Clerks meet at central clearing room | Physical exchange of cheques and computation of bilateral totals |
| **3. Net Computation** | Clearinghouse balance reconciliation | Aggregation of gross receivables minus payables for each bank |
| **4. Final Settlement** | Net settlement execution | Difference settled via gold bullion or central bank reserve ledger |

By the 1950s, paper volumes threatened to overwhelm manual banking processing. The banking sector engineered Magnetic Ink Character Recognition (MICR). 

Cheques were printed with iron oxide ink along their bottom edge using specialized typefaces such as E-13B or CMC-7. High-speed reader-sorter machines passed the paper checks across a magnetic head, inducing voltage waveforms corresponding to the unique magnetic signature of each digit. This automated sorting elevated clearinghouse throughput from hundreds to thousands of cheques per minute.

```
Iron Oxide Ink Layer ===> Magnetizing Field ===> Read Head Induced EMF
                                                      |
                                                      v
                                        Digital Waveform Digitizer
                                                      |
                                                      v
                                        Routing Transit & Account Number
```

### Telegraphic Money Orders and Telex

In 1871, the Western Union Telegraph Company introduced the telegraphic money transfer. A customer deposited cash at an originating telegraph office. The telegraph operator converted the instruction into Morse code over dedicated copper telegraph wires. 

The destination operator decoded the message, verified authenticity using a private code book (containing pre-shared cipher keys and control passwords), and disbursed physical currency to the recipient.

By the mid-twentieth century, banks replaced Morse code with Telex, an international switched network of teleprinters communicating over telegraph-grade radio and copper circuits. 

Telex suffered from major security vulnerabilities: it lacked standardized message syntax, messages were routed in plain text, and verification depended on human clerks comparing mathematical "test keys" (manual hash codes calculated from the date, amount, currency, and destination account).

## The Standardized Interbank Network Era

The manual risks and throughput bottlenecks of Telex spurred the creation of the modern interbank financial infrastructure.

| Institution Role | Geographic Location | Accounting & Messaging Function |
| :--- | :--- | :--- |
| **Originating Bank** | Accra, Ghana | Debits local customer balance in GHS |
| **Intermediary Bank (London)** | London, UK | Debits originating bank Nostro account |
| **Intermediary Bank (Frankfurt)** | Frankfurt, Germany | Receives SWIFT MT103 / pacs.008 message and adjusts Vostro account |
| **Beneficiary Bank** | Munich, Germany | Credits recipient customer account in EUR |

### SWIFT: The Messaging Backbone

Established in 1973 in Brussels by a consortium of 239 banks across 15 nations, the Society for Worldwide Interbank Financial Telecommunication (SWIFT) introduced an encrypted, standardized financial communication network.

A critical engineering principle defines SWIFT: SWIFT does not hold money, does not clear balances, and does not settle funds. SWIFT is strictly an authenticated messaging carrier.

Historically, SWIFT ran on the proprietary MT (Message Type) standard. The MT103 format served as the global standard for single customer credit transfers:

```text
{1:F01BOSSAFRAAXXX0000000000}
{2:I103DEUTDEFFXXXXN}
{4:
:20:TXREF2026102301
:23B:CRED
:32A:261023USD50000,00
:50K:/GH280010001234567890
KWAME MENSAH
ACCRA, GHANA
:59:/DE89370400440532013000
HANS SCHMIDT
MUNICH, GERMANY
:71A:SHA
-}
```

The financial industry is executing a multi-year migration to the ISO 20022 XML standard (such as `pacs.008.001.08` for credit transfers). Unlike flat MT text blocks, ISO 20022 utilizes rich, structured XML schemas. 

This change allows financial institutions to embed comprehensive remittance data, end-to-end tracking identifiers (UETR), and precise compliance metadata, directly mitigating false positives in automated sanctions screening engines.

### Nostro and Vostro Ledgers

Because SWIFT only transmits messages, actual value transfer requires bilateral balance sheet reconciliation through correspondent banking relationships:

- **Nostro Account** ("Our account at your bank"): An asset account maintained by Bank A on the balance sheet of Bank B, denominated in Bank B domestic currency.
- **Vostro Account** ("Your account at our bank"): A liability account maintained by Bank B for Bank A.

When Bank Alpha in Ghana needs to transfer euros to Bank Beta in Germany without a direct bilateral relationship, the transaction routes through an intermediary correspondent bank where both institutions maintain funded accounts. 

Settlement latency occurs because each intermediary institution must independently reconcile ledgers, inspect compliance flags, and post accounting adjustments within their local business operating hours.

### Gross Settlement versus Net Batch Clearing

Domestic payment systems divide into two distinct clearing and settlement architectures:

| Feature | Real-Time Gross Settlement (RTGS) | Automated Clearing House (ACH) / Net Settlement |
| :--- | :--- | :--- |
| **Processing Cadence** | Continuous, individual transaction execution | Scheduled batch collections (e.g., end-of-day) |
| **Settlement Finality** | Instantaneous, final, and irrevocable | Deferred netting until batch window closes |
| **Liquidity Demand** | High intraday central bank reserve requirement | Low liquidity requirement due to bilateral netting |
| **Typical Use Case** | High-value interbank wholesale and sovereign transfers | High-volume retail payroll and utility payments |

1. **Real-Time Gross Settlement (RTGS)**: Systems such as Fedwire in the United States, CHAPS in the United Kingdom, and TARGET2 in the European Union process transactions individually and continuously. Settlement across central bank reserve accounts is final and irrevocable the instant the transaction executes.
2. **Automated Clearing House (ACH)**: Systems such as the US ACH network or Bacs in the UK process retail transactions in scheduled batches. Net settlement positions are calculated periodically using Deferred Net Settlement (DNS). This batch model optimizes liquidity efficiency but introduces clearing delays of one to three business days.

## The Modern Fintech and Real-Time Settlement Era

Over the past decade, consumer expectations and internet-native business models forced a radical re-engineering of payments architecture:

| Corridor Side | User Action | Fintech Domestic Banking Action |
| :--- | :--- | :--- |
| **United Kingdom (Inflow)** | Alice initiates 100 GBP transfer | Deposited into Wise UK domestic account via Faster Payments |
| **Internal Matching Engine** | Atomic ledger netting | Wise internal core ledger balances cross-currency inventory |
| **Nigeria (Outflow)** | Kemi receives 200,000 NGN | Disbursed from Wise Nigeria domestic account via NIP switch |

### Liquidity Pool Netting: The Remittance Revolution

Traditional remittance giants such as Western Union historically relied on proprietary retail agent branch networks backed by pre-funded bank deposits. 

Modern remittance platforms such as Wise (formerly TransferWise) dismantled cross-border wire delays by circumventing international correspondent banking channels entirely.

Wise establishes domestic corporate bank accounts in every operating jurisdiction. When a user in the United Kingdom sends pounds to a recipient in Nigeria:

1. The UK sender deposits British Pounds into the Wise local UK bank account via local Faster Payments rails.
2. The Wise central transaction orchestration engine verifies the deposit and applies spot foreign exchange rates.
3. Rather than transmitting a cross-border wire to West Africa, Wise instructs its local Nigerian bank account to disburse Nigerian Naira directly to the recipient over the domestic real-time switch (NIP).

Cross-border money transfers are thereby converted into two separate, concurrent domestic transfers. 

Value only crosses international borders conceptually inside the internal double-entry bookkeeping ledger of the fintech operator. Actual cross-border liquidity rebalancing occurs infrequently in bulk treasury operations when currency surpluses in one jurisdiction offset deficits in another.

### Telecom Mobile Money: USSD and ISO 8583 Switches

In emerging economies, particularly across Sub-Saharan Africa, mobile network operators (MNOs) bypassed traditional bank branch deficits by transforming mobile phone SIM cards into financial accounts. Platforms such as M-Pesa in Kenya and MTN Mobile Money across West Africa operate over telecom signaling infrastructure:

| Network Tier | Telecommunication Component | Signaling & Protocol Specification |
| :--- | :--- | :--- |
| **Client Tier** | GSM Feature Phone Handset | User dials USSD code (e.g., `*170#`) over GSM signaling plane |
| **Radio Access** | Base Transceiver Station (BTS) | Transmits over Fast-Associated Control Channel (FACCH) |
| **Core Switching** | Mobile Switching Center (MSC) | Routes signaling payload to dedicated USSD Gateway |
| **Transport Layer** | USSD Gateway | Converts telecom signaling to SMPP or HTTP requests |
| **Financial Core** | Mobile Money Switch Engine | Processes ISO 8583 banking messages against relational balance ledger |

The underlying technical mechanics operate over Unstructured Supplementary Service Data (USSD):

1. **Signaling Plane Communication**: Unlike mobile internet packets, USSD operates over the signaling channel of the GSM network (specifically the fast-associated control channel FACCH). This enables instantaneous transaction prompts on basic feature phones without requiring mobile data connections or internet availability.
2. **Session Persistence**: USSD establishes a stateful, interactive session between the handset and the network USSD Gateway. The user enters a destination mobile number, amount, and four-digit secret PIN.
3. **Switch Integration**: The USSD Gateway translates the signaling payloads into ISO 8583 or ISO 20022 financial messages directed to the core mobile wallet database.
4. **Escrow Bank Backing**: To satisfy national central bank prudential regulations, all digital wallet float is fully backed 1:1 by physical legal tender deposited inside ring-fenced trust accounts at authorized commercial banks.

### Payment Orchestration Platforms: Stripe and Paystack

Modern developers access this heterogeneous payment ecosystem through unified REST APIs provided by payment orchestration engines like Stripe, Adyen, and Paystack.

```json
{
  "event": "charge.success",
  "data": {
    "id": "ch_3NkdV82eZvKYlo2C1gH",
    "amount": 500000,
    "currency": "ngn",
    "status": "successful",
    "channel": "mobile_money",
    "customer": {
      "email": "customer@example.com"
    },
    "idempotency_key": "idem_9f8234abcf81"
  }
}
```

These platforms resolve several foundational software engineering problems:

- **Idempotency**: In distributed networks, dropped packets can cause client retries. Payment gateways mandate `Idempotency-Key` headers on HTTP POST requests, storing transaction fingerprints in distributed key-value caches (like Redis) to guarantee that duplicate requests never result in double debits.
- **Card Tokenization**: To maintain compliance with Payment Card Industry Data Security Standards (PCI-DSS), merchant servers never handle raw Primary Account Numbers (PANs). Sensitive card details are sent directly to gateway tokenization vaults, returning a surrogate token string for recurring billing.
- **Dynamic Routing**: Automated switching engines monitor regional banking gateway uptime, dynamically rerouting failed card transactions across alternate acquiring processors in real time.

## Emerging Architectures: Unified Real-Time Rails

The future of global money transfers is converging on unified instant settlement rails:

1. **Domestic Instant Payment Schemes**: Systems such as Pix in Brazil, Unified Payments Interface (UPI) in India, and FedNow in the United States enable direct, authenticated bank-to-bank retail payments clearing within two seconds, operating continuously twenty-four hours a day, 365 days a year.
2. **Direct Bilateral RTGS Interconnection**: Projects such as Project Nexus by the Bank for International Settlements (BIS) are testing the direct programmatic link of domestic instant payment systems (connecting Singapore PayNow, India UPI, and Euro SEPA Instant) through standardized API gateways.

| Dimension | Legacy Clearing Rails | Modern Real-Time Rails |
| :--- | :--- | :--- |
| **Settlement Latency** | 3 to 5 business days | Sub-second continuous finality |
| **Transaction Cost** | High wire commissions and correspondent spreads | Fractions of a cent in clearing fees |
| **Data Schema** | Truncated plaintext lines (MT103) | Rich structured ISO 20022 XML (pacs.008) |
| **System Interface** | Paper drafts and Telex lines | RESTful OpenAPI endpoints with webhooks |

## Architectural Summary

Moving money across the globe has evolved from the physical transport of signed paper documents to cryptographic ledger updates executed across high-speed database clusters. 

Whether examining telegraph operators validating test keys in 1890, SWIFT XML messages coordinating Nostro reserves in Frankfurt, or an agent in Nairobi executing an encrypted USSD PIN confirmation, the fundamental objective remains identical: establishing verifiable, authenticated, and fault-tolerant agreement between balance sheets.
